"use client";


import SocialLogin from '@/components/SocialLogin';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (userData) => {
    const { email, password } = userData;

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.status === 200) {
        router.push('/'); // Redirect to home page on successful sign-in
      } else {
        console.error('Sign-in failed', res?.error); // Log the error message
      }
    } catch (error) {
      console.error('Error during sign-in:', error); // Handle any errors that occur during sign-in
    }
  };



  return (
    <div className="w-full container mx-auto max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-50 dark:text-gray-800">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-1 text-sm">
            <label htmlFor="username" className="block dark:text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="username"
              placeholder="Email"
              {...register("email", { required: true })}
              className="w-full px-4 py-3 border-2 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
            />
            {errors.email && <span>This field is required</span>}
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="password" className="block dark:text-gray-600">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              id="password"
              placeholder="Password"
              className="w-full px-4 py-3 border-2 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
            />
            {errors.password && <span>This field is required</span>}
            <div className="flex justify-end text-xs dark:text-gray-600">
              <a rel="noopener noreferrer" href="#">
                Forgot Password?
              </a>
            </div>
          </div>
          <input type="submit" className="block w-full p-3 text-center rounded-sm dark:text-gray-50 dark:bg-violet-600"/>
            
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
          <p className="px-3 text-sm dark:text-gray-600">
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
        </div>
        <SocialLogin/>
        <p className="text-xs text-center sm:px-6 dark:text-gray-600">
          Don`t have an account?
          <Link
            href='/singup'
            className="underline dark:text-gray-800"
          >
            Sign up
          </Link>
        </p>
    </div>
  );
};

export default LoginPage;