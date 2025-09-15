import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Test the database connection
    await prisma.$connect();
    
    // Try to count profiles
    const profileCount = await prisma.profile.count();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Prisma connected successfully!',
      profileCount 
    });
  } catch (error) {
    console.error('Prisma connection error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to connect to database',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
