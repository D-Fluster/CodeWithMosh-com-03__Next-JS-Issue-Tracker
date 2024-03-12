import { Text } from "@radix-ui/themes";

export default function Home() {
  return (
    <div>
      <Text as="div" className="text-emerald-600" mb="6" size="9">
        Hello, World&nbsp;
        <em>
          <strong>!</strong>
        </em>
      </Text>
      <Text as="div" className="text-emerald-500" size="5">
        Welcome to Dani's Issue Tracker app, built alongside Code with
        Mosh&nbsp;
        <em>
          <strong>!</strong>
        </em>
      </Text>
    </div>
  );
}
