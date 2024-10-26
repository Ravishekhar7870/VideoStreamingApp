// pages/index.tsx
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';

export default function HomePage() {
    
       
 

  return (
    <>
      <SignedIn >
    
        <div>Welcome to your app!</div>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
