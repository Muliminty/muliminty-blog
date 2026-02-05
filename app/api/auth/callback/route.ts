import { NextRequest, NextResponse } from 'next/server';

/**
 * GitHub OAuth 回调处理
 *
 * 流程：
 * 1. 接收 GitHub 返回的 code
 * 2. 用 code 换取 access_token
 * 3. 重定向回原页面，并在 URL 中携带 token
 */

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state'); // 可用于存储回调地址

  if (!code) {
    return NextResponse.redirect(new URL('/?error=no_code', request.url));
  }

  try {
    // 用 code 换取 access_token
    const tokenResponse = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        }),
      }
    );

    const data = await tokenResponse.json();

    if (data.error) {
      console.error('OAuth error:', data);
      return NextResponse.redirect(
        new URL(`/?error=${data.error}`, request.url)
      );
    }

    // 重定向回原页面，token 通过 URL 传递（客户端会保存到 localStorage）
    const redirectUrl = new URL(state || '/', request.url);
    redirectUrl.searchParams.set('token', data.access_token);

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Failed to exchange token:', error);
    return NextResponse.redirect(
      new URL('/?error=exchange_failed', request.url)
    );
  }
}
