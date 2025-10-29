import DogAvatar from "./DogAvatar.svg";

export const GreetingLabel = ({ name }: { name?: string }) => {
  return (
    <div className="hidden items-center lg:flex">
      <div className="relative flex h-10 items-center">
        <div className="bg-background border-border flex h-full items-center rounded-xl border px-3 pr-10">
          <span className="text-foreground text-xs font-bold">Hi {name}</span>
        </div>
        <div className="border-foreground bg-background absolute -right-2 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2">
          <img
            src={DogAvatar.src}
            alt="Avatar"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};
