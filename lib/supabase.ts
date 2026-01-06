import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nnbhdmqloykcvmcrkkzf.supabase.co';
const supabaseAnonKey = 'sb_publishable_hYcUurghrb4TLchkbS657Q_ISYnCEag';

// Supabase 클라이언트 싱글톤 인스턴스 생성
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * 연결 테스트 함수
 */
export const testConnection = async () => {
  try {
    // .select('count')는 count라는 컬럼을 찾는 것이므로 오류가 날 수 있음.
    // .select('*', { count: 'exact', head: true }) 또는 단순히 데이터 한건을 조회.
    const { data, error } = await supabase.from('products').select('*').limit(1);
    if (error) throw error;
    console.log('✅ Supabase 연결 성공');
    return true;
  } catch (err) {
    console.error('❌ Supabase 연결 실패:', err);
    return false;
  }
};