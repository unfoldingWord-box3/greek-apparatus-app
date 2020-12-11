export default function Card({
  children,
  className
}) {
  return (
    <div className={className + " m-2 bg-white border border-gray-300 p-5 rounded-md shadow-lg"}>
      {children}
    </div>
  );
};
