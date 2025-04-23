import Link from 'next/link';
import { client } from '@/libs/microcms';

// ブログ記事の型定義
type Props = {
  id: string;
  title: string;
};

// micro CMSからブログ記事を取得
async function getBlogPosts(): Promise<Props[]> {
  const data = await client.get({
    endpoint: 'blog', // 'blog'はmicro CMSのエンドポイント名
    queries: {
      fields: 'id,title', // idとtitleを取得（,の後にスペース入れないこと）
      limit: 5, // 最新の５件を取得
    },
  });

  return data.contents;
}

export default async function Home() {
  const posts = await getBlogPosts();

  return (
    <main>
      <h1>ブログ記事一覧</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {/* 記事へのリンクを生成 */}
            <Link href={`/blog/${post.id}`}>
              {/* タイトルを表示 */}
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}