export default function ErrorPage() {
    return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
      <h1 className="text-2xl font-bold mb-4">Sorry, something went wrong</h1>
      <br></br>
      <p>Don't have an account already? Make sure to sign up before trying to login.</p>
      <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2 mt-4"
          > 
          <a href="/login"> Login/Signup</a>
      </button>
    </main>
  )
  }