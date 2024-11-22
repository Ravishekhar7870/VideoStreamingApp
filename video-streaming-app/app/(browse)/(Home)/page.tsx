// pages/index.tsx
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';
import FeedResults, { FeedResultsSkelton } from './_components/FeedResults';
import { Suspense } from 'react';

export default function HomePage() {
    
       
 

  return (
   <div className='h-full p-8 max-w-screen-2xl mx-auto'>
    <Suspense fallback={<FeedResultsSkelton/>}>
    <FeedResults/>
    </Suspense>
    </div>
  );
}
