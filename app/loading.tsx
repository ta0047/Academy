export default function Loading() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center">

        <span className="loading loading-spinner loading-lg text-primary"></span>

        <h2 className="mt-6 text-2xl font-bold text-slate-800">
          Loading...
        </h2>

        <p className="mt-2 text-slate-500">
          Please wait while we load the page.
        </p>
      </div>
    </main>
  );
}