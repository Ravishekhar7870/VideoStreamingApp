// pages/index.tsx
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';

export default function HomePage() {
    
       
 

  return (
    <>
      <SignedIn >
      </SignedIn>
      <SignedOut>
       
      </SignedOut>
    </>
  );
}
