import React from 'react';

export function Skeleton({ className }: { className: string }) {
  return (
    <div className={`relative overflow-hidden bg-gray-100 rounded-2xl ${className}`}>
      <div className="absolute inset-0 shimmer" />
    </div>
  );
}

export function PostSkeleton() {
  return (
    <div className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-secondary/5 border border-gray-50 space-y-6">
      <div className="flex items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-2xl" />
        <div className="space-y-2">
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-24 h-3" />
        </div>
      </div>
      <Skeleton className="w-full h-64 rounded-3xl" />
      <div className="space-y-2">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-3/4 h-4" />
      </div>
      <div className="flex items-center gap-4 pt-2">
        <Skeleton className="w-16 h-8 rounded-full" />
        <Skeleton className="w-16 h-8 rounded-full" />
        <Skeleton className="ml-auto w-16 h-8 rounded-full" />
      </div>
    </div>
  );
}

export function InstitutionSkeleton() {
  return (
    <div className="bg-white p-5 rounded-[2.5rem] border border-gray-100 space-y-4 shadow-sm">
      <Skeleton className="w-full h-32 rounded-3xl" />
      <div className="flex items-center gap-4 px-2">
        <Skeleton className="w-12 h-12 rounded-2xl -mt-8 border-4 border-white" />
        <div className="space-y-2 flex-1 pt-2">
          <Skeleton className="w-3/4 h-4" />
          <Skeleton className="w-1/2 h-3" />
        </div>
      </div>
      <div className="flex justify-between items-center px-2 pt-2">
        <Skeleton className="w-24 h-4" />
        <Skeleton className="w-20 h-8 rounded-xl" />
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
    return (
        <div className="space-y-8">
            <Skeleton className="w-full h-64" />
            <div className="px-6 -mt-16 relative z-10 flex flex-col items-center">
                <Skeleton className="w-32 h-32 rounded-[2.5rem] border-8 border-surface" />
                <div className="mt-6 space-y-4 w-full flex flex-col items-center">
                    <Skeleton className="w-48 h-8" />
                    <Skeleton className="w-64 h-4" />
                    <Skeleton className="w-full h-12 rounded-2xl" />
                    <div className="flex gap-2 w-full justify-center">
                        <Skeleton className="w-20 h-8 rounded-xl" />
                        <Skeleton className="w-20 h-8 rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}
