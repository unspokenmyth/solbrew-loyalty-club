
import React from 'react';
import { MemberProfile as MemberProfileComponent } from '@/components/MemberProfile';

const MemberProfile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        <MemberProfileComponent />
      </div>
    </div>
  );
};

export default MemberProfile;
