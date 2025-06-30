import { useEffect, useState } from "react";
import PostCard from "./PostCard";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
        );
        const data = await res.json();
        setPosts((prev) => [...prev, ...data]);
        setFiltered((prev) => [...prev, ...data]);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch posts.");
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearch(term);
    const filteredResults = posts.filter((post) =>
      post.title.toLowerCase().includes(term)
    );
    setFiltered(filteredResults);
  };

  const loadMore = () => setPage((prev) => prev + 1);

  return (
    <div className="p-4">
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search posts..."
        className="mb-4 p-2 border"
      />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {!loading && (
        <button
          onClick={loadMore}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default PostList;
