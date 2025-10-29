"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AlertCircle, ChevronDown, Settings } from "lucide-react";

import type { Theme } from "@acme/ui/hooks/use-theme";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@acme/ui/components/accordion";
import { Alert, AlertDescription, AlertTitle } from "@acme/ui/components/alert";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@acme/ui/components/avatar";
import { Badge } from "@acme/ui/components/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@acme/ui/components/breadcrumb";
import { Button } from "@acme/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@acme/ui/components/card";
import { Checkbox } from "@acme/ui/components/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@acme/ui/components/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@acme/ui/components/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@acme/ui/components/dropdown-menu";
import { Input } from "@acme/ui/components/input";
import { Label } from "@acme/ui/components/label";
import { AppSidebar } from "@acme/ui/components/molecules/sidenav/index";
import {
  GreetingLabel,
  MobileMenu,
  NavigationTabs,
  SnowgroupLogo,
  TopNav,
  UserDropdown,
  VendorLogo,
} from "@acme/ui/components/molecules/topnav/index";
import { NavigationMenuLink } from "@acme/ui/components/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@acme/ui/components/popover";
import { Progress } from "@acme/ui/components/progress";
import { RadioGroup, RadioGroupItem } from "@acme/ui/components/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@acme/ui/components/select";
import { Separator } from "@acme/ui/components/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@acme/ui/components/sheet";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@acme/ui/components/sidebar";
import { Skeleton } from "@acme/ui/components/skeleton";
import { Slider } from "@acme/ui/components/slider";
import { Switch } from "@acme/ui/components/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@acme/ui/components/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@acme/ui/components/tabs";
import { Textarea } from "@acme/ui/components/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@acme/ui/components/tooltip";
import { useTheme } from "@acme/ui/hooks/use-theme";
import { cn } from "@acme/ui/lib/utils";

import { Env } from "../src/libs/Env";

export default function ShowcasePage() {
  const [sliderValue, setSliderValue] = useState([50]);
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("/sales");
  const { theme: currentTheme, setTheme } = useTheme();
  console.log(Env.NEXT_PUBLIC_ACCOUNTS_URL);

  return (
    <TooltipProvider>
      <div className="bg-background min-h-screen p-8 pt-24">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="my-52 space-y-4 text-center">
            <h1 className="text-4xl font-bold">Snowclub Checkout</h1>
            <p className="text-muted-foreground text-lg">
              (With some components from shadcn/ui)
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild>
                <Link
                  href={Env.NEXT_PUBLIC_ACCOUNTS_URL ?? "http://localhost:3001"}
                >
                  Go to Accounts
                </Link>
              </Button>
              <Button asChild>
                <Link
                  href={Env.NEXT_PUBLIC_VENDORS_URL ?? "http://localhost:3002"}
                >
                  Go to Vendors
                </Link>
              </Button>
            </div>
          </div>

          {/* Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>Various button styles and sizes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Form Components */}
          <Card>
            <CardHeader>
              <CardTitle>Form Components</CardTitle>
              <CardDescription>Input fields and form controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Type your message here." />
              </div>

              <div className="space-y-2">
                <Label>Select a fruit</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">Accept terms and conditions</Label>
                </div>

                <div className="space-y-2">
                  <Label>Choose your favorite color</Label>
                  <RadioGroup defaultValue="blue">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="red" id="red" />
                      <Label htmlFor="red">Red</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="blue" id="blue" />
                      <Label htmlFor="blue">Blue</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="green" id="green" />
                      <Label htmlFor="green">Green</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="notifications" />
                  <Label htmlFor="notifications">Enable notifications</Label>
                </div>

                <div className="space-y-2">
                  <Label>Volume: {sliderValue[0]}%</Label>
                  <Slider
                    value={sliderValue}
                    onValueChange={setSliderValue}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Display */}
          <Card>
            <CardHeader>
              <CardTitle>Data Display</CardTitle>
              <CardDescription>
                Components for displaying data and information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>

              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </div>

              <div className="space-y-2">
                <Label>Progress: 65%</Label>
                <Progress value={65} className="w-full" />
              </div>

              <div className="space-y-2">
                <Label>Skeleton Loading</Label>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                  You can add components to your app using the cli.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Navigation */}
          <Card>
            <CardHeader>
              <CardTitle>Navigation</CardTitle>
              <CardDescription>Navigation components and menus</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="space-y-2">
                  <p className="text-muted-foreground text-sm">
                    Make changes to your account here. Click save when you're
                    done.
                  </p>
                </TabsContent>
                <TabsContent value="password" className="space-y-2">
                  <p className="text-muted-foreground text-sm">
                    Change your password here. After saving, you'll be logged
                    out.
                  </p>
                </TabsContent>
                <TabsContent value="settings" className="space-y-2">
                  <p className="text-muted-foreground text-sm">
                    Manage your application settings here.
                  </p>
                </TabsContent>
              </Tabs>

              <Separator />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Open Menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/components">
                      Components
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Showcase</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </CardContent>
          </Card>

          {/* Overlays */}
          <Card>
            <CardHeader>
              <CardTitle>Overlays</CardTitle>
              <CardDescription>
                Modal dialogs, sheets, and popovers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">Open Sheet</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Edit profile</SheetTitle>
                      <SheetDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">Open Popover</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="leading-none font-medium">Dimensions</h4>
                        <p className="text-muted-foreground text-sm">
                          Set the dimensions for the layer.
                        </p>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Hover me</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This is a tooltip</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardContent>
          </Card>

          {/* Data Tables */}
          <Card>
            <CardHeader>
              <CardTitle>Data Tables</CardTitle>
              <CardDescription>
                Tables for displaying structured data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">John Doe</TableCell>
                    <TableCell>
                      <Badge>Active</Badge>
                    </TableCell>
                    <TableCell>john@example.com</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Jane Smith</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Inactive</Badge>
                    </TableCell>
                    <TableCell>jane@example.com</TableCell>
                    <TableCell className="text-right">$150.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Collapsible Content */}
          <Card>
            <CardHeader>
              <CardTitle>Collapsible Content</CardTitle>
              <CardDescription>
                Expandable and collapsible content areas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it styled?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It comes with default styles that matches the other
                    components.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is it animated?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It's animated by default, but you can disable it if you
                    prefer.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Collapsible
                open={isCollapsibleOpen}
                onOpenChange={setIsCollapsibleOpen}
              >
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    @peduarte starred 3 repositories
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2">
                  <div className="rounded-md border px-4 py-2 font-mono text-sm">
                    @radix-ui/primitives
                  </div>
                  <div className="rounded-md border px-4 py-2 font-mono text-sm">
                    @radix-ui/colors
                  </div>
                  <div className="rounded-md border px-4 py-2 font-mono text-sm">
                    @stitches/react
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <Card>
            <CardHeader>
              <CardTitle>Sidebar (Advanced Example)</CardTitle>
              <CardDescription>
                Professional sidebar with team switcher, collapsible navigation,
                and user menu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative h-96 overflow-hidden rounded-lg border">
                <div className="absolute inset-0">
                  <SidebarProvider>
                    <AppSidebar className="mt-auto h-[calc(100vh-64px)]" />
                    <SidebarInset>
                      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                          orientation="vertical"
                          className="mr-2 h-4"
                        />
                        <h1 className="text-lg font-semibold">Dashboard</h1>
                      </header>
                      <div className="flex flex-1 flex-col gap-4 p-4">
                        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                          <div className="bg-muted/50 aspect-video rounded-xl" />
                          <div className="bg-muted/50 aspect-video rounded-xl" />
                          <div className="bg-muted/50 aspect-video rounded-xl" />
                        </div>
                        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
                      </div>
                    </SidebarInset>
                  </SidebarProvider>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* TopNav Molecule */}
          <Card>
            <CardHeader>
              <CardTitle>TopNav (Molecule)</CardTitle>
              <CardDescription>
                Complete top navigation component built with shadcn/ui
                components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-muted-foreground mb-4 text-sm">
                  This is a composed molecule component that combines multiple
                  shadcn/ui atoms: Tabs, DropdownMenu, Sheet, Avatar, Badge,
                  Button, and more.
                </div>

                <div className="mb-4 flex gap-2">
                  <Button
                    variant={activeTab === "/dashboard" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab("/dashboard")}
                  >
                    Dashboard
                  </Button>
                  <Button
                    variant={activeTab === "/sales" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab("/sales")}
                  >
                    Sales
                  </Button>
                  <Button
                    variant={activeTab === "/analytics" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab("/analytics")}
                  >
                    Analytics
                  </Button>
                </div>

                <div className="overflow-hidden rounded-lg border">
                  <TopNav>
                    <div className="flex items-center gap-4">
                      <VendorLogo />
                      <Separator
                        orientation="vertical"
                        className="hidden h-8 md:block"
                      />
                      <NavigationTabs
                        tabs={[
                          { label: "Dashboard", href: "/dashboard" },
                          { label: "Sales", href: "/sales" },
                          { label: "Analytics", href: "/analytics" },
                        ]}
                        activeTab={activeTab}
                        onTabClick={(href) => {
                          setActiveTab(href);
                          console.log("Navigate to:", href);
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <GreetingLabel name="John Doe" />
                      <SnowgroupLogo />
                      <UserDropdown
                        user={{
                          name: "John Doe",
                          email: "john@example.com",
                          logo: {
                            url: "https://via.placeholder.com/140x40/FF6B35/FFFFFF?text=VENDOR",
                            name: "Vendor Logo",
                          },
                        }}
                        onLogout={() => console.log("Logout clicked")}
                        onSettings={() => console.log("Settings clicked")}
                        onTickets={() => console.log("Tickets clicked")}
                        onLocaleChange={(locale) =>
                          console.log("Locale changed to:", locale)
                        }
                        currentLocale="en"
                        availableLocales={["en", "fr", "es"]}
                        onThemeChange={(theme) => {
                          setTheme(theme as Theme);
                          console.log("Theme changed to:", theme);
                        }}
                        currentTheme={currentTheme}
                      />
                    </div>
                    <MobileMenu
                      tabs={[
                        { label: "Dashboard", href: "/dashboard" },
                        { label: "Sales", href: "/sales" },
                        { label: "Analytics", href: "/analytics" },
                      ]}
                      activeTab={activeTab}
                      onTabClick={(href) => {
                        setActiveTab(href);
                        console.log("Navigate to:", href);
                      }}
                    />
                  </TopNav>
                </div>

                <div className="text-muted-foreground text-xs">
                  <strong>Features:</strong> Responsive design, scroll effects,
                  user dropdown menu, mobile sheet menu, tab navigation,
                  language switcher, theme switcher, and customizable styling.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string;
  }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none",
            className,
          )}
          {...props}
        >
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
