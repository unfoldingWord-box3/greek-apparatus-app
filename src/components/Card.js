export default function Card({
  title,
  content,
}) {
  return (
    <div className="m-2 bg-white border border-gray-300 p-5 rounded-md shadow-lg">
      <h2 className="text-lg font-medium title-font mt-0">
        {title}
      </h2>
      <p className="leading-relaxed text-base">
        {content}
      </p>
    </div>
  );
};
