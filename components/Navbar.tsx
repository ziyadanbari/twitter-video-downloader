export default function Navbar() {
  return (
    <div className=" w-full sm:px-12 px-4 py-3 shadow-lg">
      <div className="flex items-center gap-1 select-none">
        <div>
          <svg viewBox="0 0 24 24" aria-hidden="true" width={32} height={32}>
            <g>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </g>
          </svg>
        </div>
        <div className="text-2xl font-bold text-black">TweetSave</div>
      </div>
    </div>
  );
}
