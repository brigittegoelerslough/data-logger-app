export default function ErrorPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold mb-4 -mt-20 ">
        Sorry, something went wrong
      </h1>
      <br></br>
      <p className="text-large text-center">
        {" "}
        Don't have an account already? Make sure to sign up before trying to
        login.{" "}
      </p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2 mt-8">
        <a href="/login"> Login/Signup</a>
      </button>
    </main>
  );
}
