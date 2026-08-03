import { docMetadata } from "@/components/docs/meta";
import DocsPageSchema from "@/components/docs/DocsPageSchema";
import { Code2, ExternalLink, Info, Mail, Paperclip, Send } from "lucide-react";
import { BulletList, DocCard, InfoBox, NumberedList } from "@/components/docs/ui";

export const metadata = docMetadata("email-integration");

export default function Page() {
  return (
    <>
      <DocsPageSchema slug="email-integration" />
      <section>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Email Integration
        </h1>

        <DocCard icon={<Mail size={24} />} title="Process Documents via Email">
          <p>
            Tavnit allows you to process documents simply by sending them as email attachments. Each flow has a
            unique email address that you can send documents to.
          </p>
          <p>This is perfect for:</p>
          <BulletList
            items={[
              "Forwarding invoices or receipts from your inbox",
              "Setting up email forwarding rules for automatic processing",
              "Processing documents without logging into Tavnit",
            ]}
          />
        </DocCard>

        <DocCard icon={<ExternalLink size={24} />} title="Enable Email Trigger">
          <p>
            To start receiving documents via email, you need to enable the Email Trigger for your flow:
          </p>
          <NumberedList
            items={[
              "Go to the Flows page and select your flow",
              "Open the flow's details page",
              'Find the "Email Trigger" section and enable it',
              "Copy your flow's unique email address",
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="One Run Per Attachment">
            When you send an email with multiple attachments, Tavnit creates a separate run for each PDF or
            image file. This means if you attach 3 invoices, you&apos;ll get 3 separate extraction results.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Paperclip size={24} />} title="Supported File Types">
          <p>The Email Trigger accepts the following file types as attachments:</p>
          <BulletList items={["PDF documents (.pdf)", "Images (.jpg, .jpeg, .png)"]} />
          <p>
            Other file types will be ignored. The email subject and body are not processed – only the
            attachments.
          </p>
        </DocCard>

        <DocCard icon={<Send size={24} />} title="Email Output">
          <p>
            You can also configure Tavnit to send extraction results to an email address automatically. This is
            useful when you want to receive the extracted data without checking the Tavnit dashboard.
          </p>
          <NumberedList
            items={[
              "Go to your flow's details page",
              'Find the "Email Output" section',
              "Enter the email address where you want to receive results",
              "Save your changes",
            ]}
          />
          <InfoBox color="purple" icon={<Code2 size={20} />} title="JSON Format">
            The extraction results are sent as JSON data in the email body. You can use this with email
            automation tools to parse and process the data further.
          </InfoBox>
        </DocCard>
      </section>
    </>
  );
}
