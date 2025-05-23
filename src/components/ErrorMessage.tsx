export default function ErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex text-red-600 items-center ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-xbox-x"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 21a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9a9 9 0 0 0 -9 9a9 9 0 0 0 9 9z" />
        <path d="M9 8l6 8" />
        <path d="M15 8l-6 8" />
      </svg>
      <div className="text-start text-red-600 p-3">{children}</div>
    </div>
  );
}
