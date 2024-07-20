import React from 'react'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
  } from "@/components/ui/navigation-menu"
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image';
import Logo from '../../../public/logo.png'
import toast from 'react-hot-toast';
import axios from 'axios';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';

export default function Navbar() {
    const router = useRouter();

    const Logout = async () => {
        toast.promise(
          axios.request({
            method:'POST',
            url:'/api/logout'
          }), {
            loading: 'Sedang melakukan logout...',
            success: (res) => {
              router.push('/auth/login')
              return res.data?.message || 'Something went wrong'
            },
            error:(err) => {
              return err.data?.message || 'Something went wrong'
            }
          }
        )
    }
    
    return (
        <div className='border-b-2 w-full px-8 py-6 bg-[#b6252a]'>
            <div className='flex items-center justify-between'>
                <div>
                    <Image src={Logo} alt='Logo' width={100} height={100}/>
                </div>
                <div className="hidden md:flex">
                  <NavigationMenu>
                      <NavigationMenuList className='space-x-4'>
                          <NavigationMenuItem>
                              <Link href="/dashboard" legacyBehavior passHref>
                                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                      <div className='text-md'>Dashboard</div>
                                  </NavigationMenuLink>
                              </Link>
                          </NavigationMenuItem>
                          <NavigationMenuItem>
                              <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                      <Button variant="outline">Akses Poin Tersedia</Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent className="w-56">
                                      <DropdownMenuLabel>Pilih Gedung</DropdownMenuLabel>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuGroup>
                                          <DropdownMenuItem>
                                              <Link href={'/akses-poin/gedung-feb'}>Gedung FEB</Link>
                                          </DropdownMenuItem>
                                          <DropdownMenuItem>
                                              <Link href={'/akses-poin/gedung-fkb'}>Gedung FKB</Link>
                                          </DropdownMenuItem>
                                          <DropdownMenuItem>
                                              <Link href={'/akses-poin/gedung-manterawu'}>Gedung Manterawu</Link>
                                          </DropdownMenuItem>
                                      </DropdownMenuGroup>
                                  </DropdownMenuContent>
                              </DropdownMenu>
                          </NavigationMenuItem>
                          <NavigationMenuItem>
                              <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                      <Button variant="outline">Monitoring Jaringan</Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent className="w-56">
                                      <DropdownMenuLabel>Pilih Gedung</DropdownMenuLabel>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuGroup>
                                          <Link href={'/monitoring/gedung-feb'}>
                                              <DropdownMenuItem>Gedung FEB</DropdownMenuItem>
                                          </Link>
                                          <Link href={'/monitoring/gedung-fkb'}>
                                              <DropdownMenuItem>Gedung FKB</DropdownMenuItem>
                                          </Link>
                                          <Link href={'/monitoring/gedung-manterawu'}>
                                              <DropdownMenuItem>Gedung Manterawu</DropdownMenuItem>
                                          </Link>
                                      </DropdownMenuGroup>
                                  </DropdownMenuContent>
                              </DropdownMenu>
                          </NavigationMenuItem>
                      </NavigationMenuList>
                  </NavigationMenu>
                </div>
                <div className="hidden md:flex">
                  <NavigationMenu>
                      <NavigationMenuList>
                          <NavigationMenuItem>
                              <div className='flex items-center justify-end cursor-pointer' onClick={Logout}>
                                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                      <div className='text-md font-bold underline'>Logout</div>
                                  </NavigationMenuLink>
                              </div>
                          </NavigationMenuItem>
                      </NavigationMenuList>
                  </NavigationMenu>
                </div>
                <div className="md:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">Menu</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <Link href="/dashboard">Dashboard</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel>Akses Poin Tersedia</DropdownMenuLabel>
                                <DropdownMenuItem>
                                    <Link href={'/akses-poin/gedung-feb'}>Gedung FEB</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={'/akses-poin/gedung-fkb'}>Gedung FKB</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={'/akses-poin/gedung-manterawu'}>Gedung Manterawu</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel>Monitoring Jaringan</DropdownMenuLabel>
                                <DropdownMenuItem>
                                    <Link href={'/monitoring/gedung-feb'}>Gedung FEB</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={'/monitoring/gedung-fkb'}>Gedung FKB</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={'/monitoring/gedung-manterawu'}>Gedung Manterawu</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={Logout}>
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}
