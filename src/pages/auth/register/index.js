"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";
import Image from "next/image";
import LogoRed from "../../../../public/logored.png";
import BgLogin from "../../../../public/bgLogin.png";
import axios from "axios";
import toast from "react-hot-toast";
import ClientRequest from "@/utils/clientApiService";
import { IoIosWifi } from "react-icons/io";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export default function Register() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit (data) {

    try {
        toast.promise(
        ClientRequest.Register(data), {
          loading: 'Sedang melakukan login...',
          success: (res) => {
            console.log(res)
            router.push('/auth/login');
            return "Berhasil daftar, Silahkan login untuk masuk ke sistem!"
          },
          error: (error) => {
            console.error(error);
            return error.response?.data?.message || 'Something went wrong';
          }
        }
      );
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Terjadi kesalahan saat login.');
    }
  }

  return (
    <div className="relative h-screen">
  <Image src={BgLogin} alt="Background Login" layout="fill" objectFit="" />
  <div className="absolute inset-0 flex justify-end items-end p-2">
    <div className="border pt-2 pb-5 px-9  w-[700px] shadow-lg bg-white">
      <div className="flex items-center justify-between mb-5 border-b-[#b6252a] border-b-2 py-2">
        <div className='border-4  bg-red-600 rounded-xl p-2'>
          <IoIosWifi className='text-5xl text-white '/> 
        </div>
        <h1 className="lg:text-4xl text-2xl font-bold text-[#b6252a]">Web Monitoring Jaringan</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
          <FormField control={form.control} name="username"
            render={({ field }) => (
                <FormItem>
                <h1 className="text-lg font-semibold underline text-center pb-2">Registrasi Akun Baru</h1>
                <FormLabel className="text-md">Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField control={form.control} name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <div className="flex items-center justify-end">
            <Button className="bg-[#b6252a]" type="submit">Daftar</Button>
        </div>

        </form>
      </Form>
    </div>
  </div>
</div>

  );
}
