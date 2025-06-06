# Microsoft Solutions Review Chatbot

This is a simple but professional chatbot designed to collect feedback about Microsoft solutions and business strategy. It's built with HTML, CSS, and JavaScript, making it easy to deploy to Vercel without requiring a Node.js environment.

## Features

- Conversational UI with animated typing indicators
- Support for various question types:
  - Text input
  - Multiple choice
  - Rating scales
  - Multiple selection
- Modern, responsive design with Tailwind CSS
- Ability to download responses as JSON

## Deployment Instructions for Vercel

### 1. Create a GitHub Repository

First, create a GitHub repository to host your code:

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right and select "New repository"
3. Name your repository (e.g., "microsoft-solutions-chatbot")
4. Set visibility to private or public as needed
5. Click "Create repository"

### 2. Push Your Code to GitHub

Follow the instructions on GitHub to push your code:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main
```

### 3. Deploy to Vercel

1. Go to [Vercel](https://vercel.com) and sign up/sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure your project (the defaults should work fine)
5. Click "Deploy"

Your chatbot will be live in minutes at a Vercel-provided URL!

## Customization

To customize this chatbot:

- Edit the questions array in `script.js` to modify the questions
- Adjust styles in `styles.css` to change the appearance
- Modify `index.html` to update the layout or add new elements

## Saving Responses

Currently, responses are saved in browser memory and can be downloaded as JSON. To store responses in a database:

1. Create a simple API endpoint (e.g., using Vercel Serverless Functions)
2. Modify the code in `script.js` to send responses to your API
3. Set up a database (e.g., MongoDB, Supabase, or Firebase) to store the responses

## License

This project is for internal use only.
