'use client';

import { useState, useEffect, useRef } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { Menu, Search, ShoppingCart, User, Moon, Sun, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { APP_ROUTES } from '@/config/app-routes';
import { useSession } from 'next-auth/react';

export function Header() {
	const t = useTranslations('header.nav');
	const tAc = useTranslations('header.action');
	const locale = useLocale();
	const pathname = usePathname();
	const { data: session } = useSession();
	const [isOpen, setIsOpen] = useState(false);
	const [isHidden, setIsHidden] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);

	const lastScrollY = useRef(0);
	const ticking = useRef(false);

	const { theme, setTheme } = useTheme();

	useEffect(() => {
		const update = () => {
			const current = window.scrollY;

			setScrolled(current > 20);

			if (current > lastScrollY.current && current > 80) {
				setIsHidden(true);
			} else {
				setIsHidden(false);
			}

			lastScrollY.current = current;
			ticking.current = false;
		};

		const onScroll = () => {
			if (!ticking.current) {
				requestAnimationFrame(update);
				ticking.current = true;
			}
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	const menuItems = [
		{ href: APP_ROUTES.HOME, label: t('home') },
		{ href: APP_ROUTES.SHOP.MEN, label: t('men') },
		{ href: APP_ROUTES.SHOP.WOMEN, label: t('women') },
		{ href: APP_ROUTES.SHOP.NEW, label: t('newArrivals') },
		{ href: APP_ROUTES.SHOP.SALE, label: t('sale') },
	];

	return (
		<>
			<motion.header
				className="fixed top-0 z-50 w-full"
				animate={{ y: isHidden ? -100 : 0 }}
				transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
			>
				<div
					className={`transition-all duration-500 ${
						scrolled
							? 'bg-white/60 backdrop-blur-xl dark:bg-black/60'
							: 'bg-transparent'
					}`}
				>
					<div className="container mx-auto flex h-20 items-center justify-between px-6">
						<Link
							href={APP_ROUTES.HOME}
							className="text-2xl font-light tracking-[0.3em]"
						>
							FASHION
						</Link>

						{/* Desktop */}
						<nav className="hidden items-center gap-12 md:flex">
							{menuItems.map((item, index) => {
								const isActive = pathname === item.href;

								return (
									<motion.div
										key={item.href + index}
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.08 }}
									>
										<Link
											href={item.href}
											className={`relative text-xs tracking-widest uppercase transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full ${
												isActive ? 'text-primary' : 'text-black dark:text-white'
											}`}
										>
											{item.label}
										</Link>
									</motion.div>
								);
							})}
						</nav>

						{/* Right */}
						<div className="flex items-center gap-3">
							<Button
								variant="ghost"
								size="icon"
								onClick={() => setSearchOpen(true)}
							>
								<Search className="h-4 w-4" />
							</Button>

							<Button variant="ghost" size="icon">
								<ShoppingCart className="h-4 w-4" />
							</Button>

							{!session ? (
								<Button variant="ghost" size="icon">
									<Link href={APP_ROUTES.AUTH.SIGN_IN} className="cursor-auto">
										<User className="h-4 w-4" />
									</Link>
								</Button>
							) : (
								<Button asChild>
									<Link href={APP_ROUTES.DASHBOARD}>Dashboard</Link>
								</Button>
							)}

							{/* Theme */}
							<Button
								variant="ghost"
								size="icon"
								onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
							>
								<Sun className="h-4 w-4 transition-all dark:scale-0" />
								<Moon className="absolute h-4 w-4 scale-0 transition-all dark:scale-100" />
							</Button>

							{/* Language */}
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" size="sm">
										{locale.toUpperCase()}
									</Button>
								</DropdownMenuTrigger>

								<DropdownMenuContent align="end">
									<DropdownMenuItem asChild>
										<Link href={pathname} locale="en">
											EN
										</Link>
									</DropdownMenuItem>

									<DropdownMenuItem asChild>
										<Link href={pathname} locale="vi">
											VI
										</Link>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>

							{/* Mobile */}
							<Sheet open={isOpen} onOpenChange={setIsOpen}>
								<SheetTrigger asChild className="md:hidden">
									<Button variant="ghost" size="icon">
										<Menu className="h-5 w-5" />
									</Button>
								</SheetTrigger>

								<SheetContent side="right" className="w-80">
									<div className="mt-10 flex flex-col gap-6">
										{menuItems.map((item, index) => (
											<Link
												key={item.href + index}
												href={item.href}
												onClick={() => setTimeout(() => setIsOpen(false), 150)}
												className="text-lg tracking-wide uppercase"
											>
												{item.label}
											</Link>
										))}
									</div>
								</SheetContent>
							</Sheet>
						</div>
					</div>
				</div>
			</motion.header>

			{/* Search Overlay */}
			<AnimatePresence>
				{searchOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-100 bg-black/80 backdrop-blur-xl"
					>
						<div className="flex h-full flex-col items-center justify-center gap-6">
							<input
								autoFocus
								placeholder={tAc('search')}
								className="w-[80%] max-w-xl border-b border-white bg-transparent text-center text-2xl text-white outline-none"
							/>

							<Button variant="ghost" onClick={() => setSearchOpen(false)}>
								<X className="h-6 w-6 text-white" />
							</Button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
