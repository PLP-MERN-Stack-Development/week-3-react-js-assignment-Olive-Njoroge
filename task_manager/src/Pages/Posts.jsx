import PostList from '../components/PostList';

function Posts() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">API Posts</h1>
      <PostList />
    </div>
  );
}

export default Posts;
