import ListOfPosts from "./PostList";

export default function Posts() {
  document.title = "Medi@holic | Posts";
  return (
    <>
      <div className="postList">
        <ListOfPosts />
      </div>
    </>
  );
}
