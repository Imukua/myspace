// app/api/chat/route.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Import all your data files
import { personalInfo } from '@/data/personal-info'; // Adjust path if needed
import { experiences } from '@/data/experience';     // Adjust path if needed
import { projects } from '@/data/projects';         // Adjust path if needed
import { activities } from '@/data/activities';     // Adjust path if needed
import { socialLinks } from '@/data/social-links';   // Adjust path if needed
import { certifications } from '@/data/certifications';

// Assuming 'interests' and 'currentlyWatching' are in separate files for clarity:
import { interests } from '@/data/activities';
import { currentlyWatching } from '@/data/activities';

// Access your API key as an environment variable.
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is not set.");
}

const genAI = new GoogleGenerativeAI(API_KEY);
// Using a robust model like gemini-1.5-flash for better performance and cost efficiency
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Or "gemini-1.5-pro"

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    if (!question || typeof question !== 'string') {
      return NextResponse.json({ error: "Invalid or missing 'question' in request body." }, { status: 400 });
    }

    // --- Format Personal Information ---
    const formattedPersonalInfo = `
Name: ${personalInfo.name}
Title: ${personalInfo.title}
Location: ${personalInfo.location}
Description: ${personalInfo.description}
Key Technologies: ${personalInfo.keyTechnologies.join(', ')}
    `;

    // --- Format Experiences ---
    const formattedExperiences = experiences.map(exp => `
- **Period:** ${exp.period}
- **Company:** ${exp.company}
- **Title:** ${exp.title}
- **Description:** ${exp.description}
- **Technologies:** ${exp.technologies.join(', ') || 'N/A'}
- **Achievements:**
${exp.achievements.map(ach => `  - ${ach}`).join('\n')}
    `).join('\n---\n'); // Add a separator between experiences for clarity

    // --- Format Projects ---
    const formattedProjects = projects.map(proj => `
- **Title:** ${proj.title}
- **Description:** ${proj.description}
- **Technologies:** ${proj.technologies.join(', ') || 'N/A'}
- **GitHub:** ${proj.github || 'N/A'}
- **Live URL:** ${proj.liveUrl || 'N/A'}
- **Achievements:**
${proj.achievements.map(ach => `  - ${ach}`).join('\n')}
    `).join('\n---\n');

    // --- Format Social Links (excluding UI components like 'icon' and 'color') ---
    const formattedSocialLinks = socialLinks.map(link => `
- ${link.name}: ${link.url}
    `).join(''); // No extra separator needed here, just a list

    // --- Format Activities ---
    const formattedActivities = activities.map(activity => `
- **Activity:** ${activity.title}
- **Description:** ${activity.description}
- **Details:**
${activity.details.map(detail => `  - ${detail}`).join('\n')}
    `).join('\n---\n');

    // --- Format Interests (assuming a simple array of strings) ---
    const formattedInterests = interests.join(', '); // Simple comma-separated list

    // --- Format Currently Watching Shows ---
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

    // --- Format Certifications ---
    const formattedCertifications = certifications.map(cert => `
- **Title:** ${cert.name}
- **Issuer:** ${cert.issuer}
    `).join('\n---\n');


    // --- Combine all formatted data into a single context string for the AI ---
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

    // --- Construct the prompt for the Gemini API ---
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

    // --- Call the Gemini API ---
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ answer: text });

  } catch (error: any) {
    console.error("Full error details:", error);
    console.error("Error message:", error.message);
    console.error("Error name:", error.name);
    // Return a generic error message to the client
    return NextResponse.json({ error: "Failed to get an answer from the AI. Please try again later." }, { status: 500 });
  }
}