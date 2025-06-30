const PostCard = ({ post }) => (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
  
  export default PostCard;
  