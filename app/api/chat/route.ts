import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import { personalInfo } from '@/data/personal-info';
import { experiences } from '@/data/experience';
import { projects } from '@/data/projects';
import { activities } from '@/data/activities';
import { socialLinks } from '@/data/social-links';
import { certifications } from '@/data/certifications';
import { interests } from '@/data/activities';
import { currentlyWatching } from '@/data/activities';
import Redis from 'ioredis';

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is not set.");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

interface SessionRecord {
  count: number;
  firstRequestTime: number;
}

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const SESSION_COOKIE_NAME = 'chat_session_id';
const SESSION_COOKIE_EXPIRATION_SECONDS = 30 * 24 * 60 * 60;

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    if (!question || typeof question !== 'string') {
      return NextResponse.json({ error: "Invalid or missing 'question' in request body." }, { status: 400 });
    }

    const cookieStore = await cookies();
    let sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionId) {
      sessionId = uuidv4();
      cookieStore.set({
        name: SESSION_COOKIE_NAME,
        value: sessionId,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: SESSION_COOKIE_EXPIRATION_SECONDS,
        path: '/',
        sameSite: 'lax',
      });
    }

    const currentTime = Date.now();
    const redisKey = `rate_limit:${sessionId}`;
    const recordStr = await redis.get(redisKey);
    let record: SessionRecord = recordStr ? JSON.parse(recordStr) : { count: 0, firstRequestTime: currentTime };

    if (currentTime - record.firstRequestTime > RATE_LIMIT_WINDOW_MS) {
      record = { count: 1, firstRequestTime: currentTime };
    } else {
      record.count++;
      if (record.count > MAX_REQUESTS_PER_WINDOW) {
        const remainingTime = Math.ceil((record.firstRequestTime + RATE_LIMIT_WINDOW_MS - currentTime) / 1000);
        await redis.setex(redisKey, remainingTime > 0 ? remainingTime : 1, JSON.stringify(record));
        return NextResponse.json(
          { error: `Too many requests. Please try again in ${remainingTime > 0 ? remainingTime : 1} seconds.` },
          { status: 429 }
        );
      }
    }

    await redis.setex(redisKey, Math.ceil(RATE_LIMIT_WINDOW_MS / 1000), JSON.stringify(record));
    const formattedPersonalInfo = `
Name: ${personalInfo.name}
Title: ${personalInfo.title}
Location: ${personalInfo.location}
Description: ${personalInfo.description}
Key Technologies: ${personalInfo.keyTechnologies.join(', ')}
    `;

    const formattedCertifications = certifications.map(cert => `
- **Certification:** ${cert.name}
- **Issuer:** ${cert.issuer}
    `).join('\n---\n');

    const formattedExperiences = experiences.map(exp => `
- **Period:** ${exp.period}
- **Company:** ${exp.company}
- **Title:** ${exp.title}
- **Description:** ${exp.description}
- **Technologies:** ${exp.technologies.join(', ') || 'N/A'}
- **Achievements:**
${exp.achievements.map(ach => `  - ${ach}`).join('\n')}
    `).join('\n---\n');

    const formattedProjects = projects.map(proj => `
- **Title:** ${proj.title}
- **Description:** ${proj.description}
- **Technologies:** ${proj.technologies.join(', ') || 'N/A'}
- **GitHub:** ${proj.github || 'N/A'}
- **Live URL:** ${proj.liveUrl || 'N/A'}
- **Achievements:**
${proj.achievements.map(ach => `  - ${ach}`).join('\n')}
    `).join('\n---\n');

    const formattedSocialLinks = socialLinks.map(link => `
- ${link.name}: ${link.url}
    `).join('');

    const formattedActivities = activities.map(activity => `
- **Activity:** ${activity.title}
- **Description:** ${activity.description}
- **Details:**
${activity.details.map(detail => `  - ${detail}`).join('\n')}
    `).join('\n---\n');

    const formattedInterests = interests.join(', ');

    const formattedCurrentlyWatching = currentlyWatching.map(show => `
- **Title:** ${show.title}
- **Network:** ${show.network}
- **Genre:** ${show.genre}
- **Year:** ${show.year}
- **Episodes:** ${show.episodes}
- **Status:** ${show.status}
- **Rating:** ${show.rating}
- **Description:** ${show.description}
    `).join('\n---\n');

    const aboutMeData = `
    # About Ian Mukua

    ## Personal Information:
    ${formattedPersonalInfo}

    ## Professional Experience:
    ${formattedExperiences}

    ## Key Projects:
    ${formattedProjects}

    ## Interests & Activities:
    ## Interests:
    ${formattedInterests}

    ## Activities:
    ${formattedActivities}

    ## Currently Watching (TV Shows/Anime):
    ${formattedCurrentlyWatching}

    ## Social Links:
    ${formattedSocialLinks}

    ## Certifications:
    ${formattedCertifications}
    `;

    const prompt = `
    You are an AI assistant designed to answer questions about Ian Mukua.
    Here is factual information about Ian Mukua, his work, and his interests:

    ${aboutMeData}

    Based *strictly* on the provided information, answer the following question truthfully and concisely.
    **Always format your answer using clear, structured lists or bullet points (using Markdown syntax like '*' or '-') where appropriate.**
    Use bolding (using Markdown '**word**') for key terms or names.
    If the question cannot be answered using *only* the provided information, state politely that you don't have information on that specific topic about Ian Mukua.
    Do not invent or speculate information. Focus on providing accurate details from the given context.

    User's Question: ${question}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ answer: text });

  } catch (error: any) {
    console.error("Full error details:", error);
    console.error("Error message:", error.message);
    console.error("Error name:", error.name);
    return NextResponse.json({ error: "Failed to get an answer from the AI. Please try again later." }, { status: 500 });
  }
}