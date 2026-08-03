import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import { CheckCircle2, Info, Send, Settings2, Zap } from "lucide-react";
import { BulletList, DocCard, InfoBox, NumberedList } from "@/components/docs/ui";

export const metadata = docMetadata("webhooks");

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="webhooks" />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Webhooks
        </h1>

        <DocCard icon={<Zap size={24} />} title="What is a Webhook?">
          <p>
            A webhook is like a notification system. When you set a webhook URL on a flow, we&apos;ll
            automatically send a message to that URL whenever a document finishes processing.
          </p>
          <p>
            Think of it like getting a text message when your pizza is ready – except instead of pizza,
            it&apos;s your processed document data!
          </p>
        </DocCard>

        <DocCard icon={<CheckCircle2 size={24} />} title="Why Use Webhooks?">
          <p>Webhooks are perfect for automation. For example, you could have the results:</p>
          <BulletList
            items={[
              "Automatically added to a Google Sheet or database",
              "Sent as a notification to Slack or Teams",
              "Trigger another process in Make.com or Zapier",
              "Update records in your CRM or accounting software",
            ]}
          />
          <p>
            Without webhooks, you would need to keep checking if documents are done processing. With webhooks,
            you just sit back and let the data come to you.
          </p>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="How to Set Up a Webhook">
          <NumberedList
            items={[
              "Go to the Flows page",
              "Click on the flow you want to configure",
              "Open the flow settings or details panel",
              'Find the "Webhook URL" field',
              "Enter your webhook URL (the address where you want to receive notifications)",
              "Save your changes",
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="Where do I get a webhook URL?">
            If you use Make.com, Zapier, or similar tools, they provide webhook URLs when you create a
            &ldquo;webhook trigger&rdquo;. You can also create your own endpoint if you have a web server.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Send size={24} />} title="What Happens When a Webhook Fires">
          <p>When a document finishes processing:</p>
          <NumberedList
            items={[
              "Tavnit extracts the data from your document",
              "We send a message (HTTP POST request) to your webhook URL",
              "The message contains the extracted data in JSON format",
              "Your receiving system can then do whatever you want with the data",
            ]}
          />
          <p>This all happens automatically – no manual intervention needed!</p>
        </DocCard>
      </section>
    </>
  );
}
