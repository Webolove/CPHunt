This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

# Step 1:
Visit the [Firebase Console](https://console.firebase.google.com/u/0/). If you already have an account, log in; otherwise, sign up to create one.  

Once logged in, create a new Firebase project and copy all the provided validation keys. Then, enable Firebase Authentication and Firestore. This process is straightforward and doesn't require advanced coding knowledge.  

After completing these steps, we can proceed to the next stage.

# Step 2:
Download this Git repository and save it to your local system. Rest assured, it is completely safe and free from malware, so there's no need to worry.

# Step 3:
Open the folder on your local system and navigate to the root directory where all files (such as `src`, `public`, and others) are located.

Create a new file named `.env.local` in this directory and add the values you copied earlier, in this way:
``` bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN= 
NEXT_PUBLIC_FIREBASE_PROJECT_ID= 
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET= 
NEXT_PUBLIC_FIREBASE_SENDER_ID= 
NEXT_PUBLIC_FIREBASE_APP_ID= 
measurementId:

NEXT_PUBLIC_CPHUNT_ADMIN=
```

Don't worry about the last variable—I've got it covered! It will store the user ID of the admin (*overpowered, sounds cool*).  

For now, fill in all the values from Firebase. As for the last variable, you'll find out in the next step.

# Step 4: 
Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Step 5:
You can create an account in the `localhost` app by clicking on **Sign Up**.  

Then, head to the Firestore section in the Firebase Console—you'll see a newly created user ID. You can either assign this power to someone else or make yourself the *Admin* (*trust matters!*).

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
