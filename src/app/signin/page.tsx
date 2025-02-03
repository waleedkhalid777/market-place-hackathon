"use client";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FcGoogle } from "react-icons/fc";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqbH2kKYUommsLaWdIxPvM5qjulunp_3w",
  authDomain: "ecommerce-website-45ad0.firebaseapp.com",
  projectId: "ecommerce-website-45ad0",
  storageBucket: "ecommerce-website-45ad0.appspot.com",
  messagingSenderId: "112491678765",
  appId: "1:112491678765:web:1dfa731562c2450fb83ca4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

const SignIn: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || currentUser.email,
          email: currentUser.email,
          imageUrl: currentUser.photoURL,
        });
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleSignIn = async (provider: any) => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      setUser({
        name: result.user.displayName,
        email: result.user.email,
        imageUrl: result.user.photoURL,
      });
      window.location.href = "/";
    } catch (error) {
      setError("An error occurred while signing in.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async () => {
    setIsLoading(true);
    setError("");
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = userCredential.user;

        let photoURL = "";
        if (profilePicture) {
          const storageRef = ref(storage, `profile_pictures/${newUser.uid}`);
          await uploadBytes(storageRef, profilePicture);
          photoURL = await getDownloadURL(storageRef);
        }

        await updateProfile(newUser, {
          displayName: email.split("@")[0],
          photoURL: photoURL || "https://via.placeholder.com/150", // default placeholder if no photo is uploaded
        });

        setUser({
          name: newUser.displayName,
          email: newUser.email,
          imageUrl: newUser.photoURL || "https://via.placeholder.com/150", // fallback
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      window.location.href = "/";
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div>
      <h1 className="text-4xl text-black font-bold text-center py-8 animate-fade-in">
        Sign In <br /> Transform Your Space with Elegant Furniture
      </h1>

      <div className="flex items-center space-x-2 text-xl font-sans font-bold text-gray-800 justify-center">
        <img src="/logo.png" alt="Logo" className="w-20 h-20" />
        <span className="text-3xl">Furniro</span>
      </div>

      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-white-700 to-purple-900 relative">
        <div className="absolute inset-0 opacity-50 bg-cover bg-center" style={{ backgroundImage: 'url(/path/to/your/background-image.jpg)' }}></div>
        <div className="relative bg-amber-500 bg-opacity-10 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-96 text-center">
          <h2 className="text-3xl font-bold mb-6 text-black animate-slide-in">
            {user ? "Welcome" : isSignUp ? "Create Account" : "Sign In"}
          </h2>

          {user ? (
            <div className="flex flex-col items-center animate-fade-in">
              {user.imageUrl && (
                <img
                  src={user.imageUrl}
                  alt={user.name}
                  className="w-24 h-24 rounded-full shadow-m"
                />
              )}
              <p className="mt-4 text-lg font-semibold text-black">
                {`Hello, ${user.name}`}
              </p>
              <button
                onClick={handleSignOut}
                className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition-all"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <div className="mb-4 animate-slide-in">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-lg bg-transparent text-black placeholder-gray-500 mb-2 bg-white"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-lg bg-transparent text-black placeholder-gray-500 mb-2 bg-white"
                />
                {isSignUp && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfilePicture(e.target.files?.[0] || null)}
                    className="w-full p-2 border border-white rounded-lg bg-transparent text-black mb-2"
                  />
                )}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  onClick={handleEmailAuth}
                  className="w-full bg-green-600 text-white py-2 rounded-lg shadow-md hover:bg-green-700 transition-all mb-2"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
                </button>
                <p
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-blue-400 cursor-pointer text-sm mt-2"
                >
                  {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                </p>
              </div>
              <p className="text-gray-500 mb-2 animate-slide-in">Or</p>
              <button
                onClick={() => handleSignIn(googleProvider)}
                className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all animate-slide-in"
                disabled={isLoading}
              >
                <FcGoogle className="text-2xl" />
                {isLoading ? "Signing In..." : "Sign In with Google"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
