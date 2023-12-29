import { FC, FormEvent, useState } from "react";
import { trpc } from "../utils/trpc";

export const Home: FC = () => {
  const { mutate } = trpc.greet.useMutation();
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    mutate(
      { name },
      {
        onSuccess: async (res) => {
          setGreeting(res.greeting);
        },
      }
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <p>Greeting: {greeting}</p>
    </div>
  );
};
