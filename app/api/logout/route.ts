import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    console.log("API logout called");
    
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error("API logout error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    
    console.log("API logout successful");
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error("API logout failed:", error);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}
