"use client";

import { Fragment, useState } from "react";
import { ArrowLeftRight, ArrowRight, CircleDot, Code2, Database, Download, ExternalLink, FolderInput, Info, Layers, Lock, Paperclip, Settings2, Split, Star, Wand2, Zap } from "lucide-react";
import { BulletList, CodeBlock, DocCard, InfoBox, InlineCode, NumberedList, WarningBox } from "@/components/docs/ui";
import {
  BUCKETS_JSON_EXAMPLE,
  CLEANERS_JSON_EXAMPLE,
  COLLECTIONS_JSON_EXAMPLE,
  JAVASCRIPT_BUCKETS_CODE,
  JAVASCRIPT_CLEANERS_CODE,
  JAVASCRIPT_CODE,
  JAVASCRIPT_COLLECTIONS_CODE,
  JAVASCRIPT_SPLITTERS_CODE,
  JSON_BODY_EXAMPLE,
  PYTHON_BUCKETS_CODE,
  PYTHON_CLEANERS_CODE,
  PYTHON_CODE,
  PYTHON_COLLECTIONS_CODE,
  PYTHON_SPLITTERS_CODE,
  SPLITTERS_JSON_EXAMPLE,
} from "@/components/docs/code-samples";

type ApiTab = "code" | "no-code";
type Lang = "python" | "javascript";

/**
 * API Integration content.
 *
 * Both tab panels are always rendered and the inactive one is hidden with CSS
 * rather than unmounted. The visible design is unchanged, but it means the
 * No-Code documentation now exists in the served HTML — under the previous
 * conditional render only the active tab reached the page source, so more than
 * half of this page was invisible to crawlers.
 *
 * The Python/JavaScript toggle inside the Code tab is left as a true
 * conditional: those are equivalent code samples, not distinct content.
 */
export default function ApiIntegrationContent() {
  const [apiTab, setApiTab] = useState<ApiTab>("code");
  const [lang, setLang] = useState<Lang>("python");

  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
        API Integration
      </h1>

      {/* Sub-tabs */}
      <div className="flex gap-1 p-1 bg-white/[0.04] rounded-lg w-fit mb-8 border border-white/[0.08]" role="tablist">
        <button
          role="tab"
          aria-selected={apiTab === "code"}
          onClick={() => setApiTab("code")}
          className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
            apiTab === "code"
              ? "bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white shadow-lg"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          Code
        </button>
        <button
          role="tab"
          aria-selected={apiTab === "no-code"}
          onClick={() => setApiTab("no-code")}
          className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
            apiTab === "no-code"
              ? "bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white shadow-lg"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          No-Code
        </button>
      </div>

      {/* ── Code tab ── */}
      <div role="tabpanel" aria-label="Code" className={apiTab === "code" ? undefined : "hidden"}>
        <DocCard icon={<Info size={24} />} title="What is an API?">
          <p>
            An API (Application Programming Interface) is like a messenger that lets different software talk
            to each other. Instead of manually uploading documents through our website, you can write a
            small program that sends documents automatically.
          </p>
          <p>This is useful if you want to:</p>
          <BulletList
            items={[
              "Process many documents at once",
              "Connect Tavnit to other tools you use",
              "Build automated workflows",
            ]}
          />
        </DocCard>

        <DocCard icon={<Lock size={24} />} title="Credentials">
          <h3 className="text-base font-semibold text-gray-200 mt-2 mb-1">API Key</h3>
          <p>Your API key is available in the Integrations tab after signing in.</p>
          <WarningBox>
            Keep your API key secret. If you regenerate it from the Integrations tab, the previous key will
            be disabled.
          </WarningBox>

          <h3 className="text-base font-semibold text-gray-200 mt-5 mb-1">Flow ID</h3>
          <p>The Flow ID can be found on each flow&apos;s details page. Use this when sending documents to a specific flow.</p>

          <h3 className="text-base font-semibold text-gray-200 mt-5 mb-1">Collection ID</h3>
          <p>The Collection ID can be found on each collection&apos;s details page. Use this when you want AI to route documents to the best-matching flow.</p>

          <h3 className="text-base font-semibold text-gray-200 mt-5 mb-1">Cleaner ID</h3>
          <p>The Cleaner ID can be found on each cleaner&apos;s details page. Use this when triggering a sweep to post-process or enrich extracted data.</p>

          <h3 className="text-base font-semibold text-gray-200 mt-5 mb-1">Splitter ID</h3>
          <p>The Splitter ID can be found on each splitter&apos;s details page. Use this when sending documents to be split into individual document types.</p>

          <h3 className="text-base font-semibold text-gray-200 mt-5 mb-1">Bucket ID &amp; Name</h3>
          <p>Both required when writing to a bucket via API. Find them by tapping the info icon on the bucket&apos;s detail page. The name acts as a safety check to prevent accidental writes to the wrong bucket.</p>

          <h3 className="text-base font-semibold text-gray-200 mt-5 mb-1">API URLs</h3>
          <p className="mb-1">Flows API (send to specific flow):</p>
          <div className="mb-3"><InlineCode>https://run.tavnit.io/api/runs/process</InlineCode></div>
          <p className="mb-1">Collections API (AI routes to best flow):</p>
          <div className="mb-3"><InlineCode>https://run.tavnit.io/api/collections/process</InlineCode></div>
          <p className="mb-1">Cleaners API (trigger a sweep):</p>
          <div className="mb-3"><InlineCode>https://run.tavnit.io/api/sweeps/run</InlineCode></div>
          <p className="mb-1">Splitters API (split documents by type):</p>
          <div className="mb-3"><InlineCode>https://run.tavnit.io/api/splits/run</InlineCode></div>
          <p className="mb-1">Buckets API (write rows to a bucket):</p>
          <div><InlineCode>https://run.tavnit.io/api/buckets/write</InlineCode></div>
        </DocCard>

        <DocCard icon={<Download size={24} />} title="Sending Documents">
          <p>Tavnit accepts documents in two ways:</p>
          <InfoBox color="purple" icon={<Paperclip size={20} />} title="Multipart file upload">
            Send the file as binary data (classic file upload). Best when you have direct access to the
            file.
          </InfoBox>
          <InfoBox color="violet" icon={<Code2 size={20} />} title="Base64-encoded file">
            Send the file content as a base64 string with a filename. Useful when working with automation
            tools or APIs that provide files as base64.
          </InfoBox>
          <p>Both methods use the same endpoint and header:</p>
          <BulletList
            items={[
              <Fragment key="f0">URL: <InlineCode>https://run.tavnit.io/api/runs/process</InlineCode></Fragment>,
              <Fragment key="f1">Header: <InlineCode>X-API-Key: YOUR_API_KEY</InlineCode></Fragment>,
            ]}
          />
        </DocCard>

        <DocCard icon={<Code2 size={24} />} title="Code Example">
          <p>Select your preferred programming language:</p>
          <div className="flex gap-1 p-1 bg-white/[0.04] rounded-lg w-fit my-4 border border-white/[0.08]">
            <button
              onClick={() => setLang("python")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                lang === "python"
                  ? "bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Python
            </button>
            <button
              onClick={() => setLang("javascript")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                lang === "javascript"
                  ? "bg-gradient-to-r from-[#3b82f6] to-[#6c42f0] text-white shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              JavaScript
            </button>
          </div>
          {lang === "python" ? (
            <CodeBlock lang="Python" code={PYTHON_CODE} />
          ) : (
            <CodeBlock lang="JavaScript" code={JAVASCRIPT_CODE} />
          )}
        </DocCard>

        <DocCard icon={<FolderInput size={24} />} title="Collections API">
          <p>
            Collections allow you to send documents without knowing which flow to use.
            AI analyzes each document and routes it to the most appropriate flow automatically.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="When to use Collections API">
            Use this when you receive mixed document types (invoices, receipts, contracts, etc.)
            and want AI to determine the correct flow for each document.
          </InfoBox>
          <p>The Collections API works the same as the Flows API, but uses a collection_id instead of flow_id:</p>
          <BulletList
            items={[
              <Fragment key="f2">URL: <InlineCode>https://run.tavnit.io/api/collections/process</InlineCode></Fragment>,
              <Fragment key="f3">Header: <InlineCode>X-API-Key: YOUR_API_KEY</InlineCode></Fragment>,
              <Fragment key="f4">Body: <InlineCode>collection_id</InlineCode> instead of <InlineCode>flow_id</InlineCode></Fragment>,
            ]}
          />
          {lang === "python" ? (
            <CodeBlock lang="Python (Collections)" code={PYTHON_COLLECTIONS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Collections)" code={JAVASCRIPT_COLLECTIONS_CODE} />
          )}
          <InfoBox color="purple" icon={<ArrowRight size={20} />} title="Learn more about Collections">
            See the Collections tab for a full explanation of how document routing works and how to set up collections in the app.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Wand2 size={24} />} title="Cleaners API">
          <p>
            Cleaners can be triggered via the API to run a sweep on a document or dataset.
            This is useful when you want to trigger enrichment or normalisation as part of an automated pipeline.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="When to use the Cleaners API">
            Use this after a flow run to post-process or enrich the extracted values —
            for example normalising date formats, correcting spellings, or classifying values into categories.
          </InfoBox>
          <p>The Cleaners API uses a cleaner_id and accepts a file to sweep:</p>
          <BulletList
            items={[
              <Fragment key="f5">URL: <InlineCode>https://run.tavnit.io/api/sweeps/run</InlineCode></Fragment>,
              <Fragment key="f6">Header: <InlineCode>X-API-Key: YOUR_API_KEY</InlineCode></Fragment>,
              <Fragment key="f7">Body: <InlineCode>cleaner_id</InlineCode> + file (multipart or base64)</Fragment>,
            ]}
          />
          {lang === "python" ? (
            <CodeBlock lang="Python (Cleaners)" code={PYTHON_CLEANERS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Cleaners)" code={JAVASCRIPT_CLEANERS_CODE} />
          )}
          <InfoBox color="purple" icon={<ArrowRight size={20} />} title="Learn more about Cleaners">
            See the Cleaners tab for how to configure fields, extraction hints, and sweep results.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Split size={24} />} title="Splitters API">
          <p>
            Splitters allow you to split multi-document PDFs into individual documents.
            AI classifies each page range and matches it to a document type defined in the splitter.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="When to use Splitters API">
            Use this when you receive combined PDFs containing multiple document types
            (e.g., a stack of invoices, receipts, and contracts in a single file) and need them separated.
          </InfoBox>
          <p>The Splitters API uses a splitter_id to identify which splitter to run:</p>
          <BulletList
            items={[
              <Fragment key="f8">URL: <InlineCode>https://run.tavnit.io/api/splits/run</InlineCode></Fragment>,
              <Fragment key="f9">Header: <InlineCode>X-API-Key: YOUR_API_KEY</InlineCode></Fragment>,
              <Fragment key="f10">Body: <InlineCode>splitter_id</InlineCode> + file (multipart or base64)</Fragment>,
            ]}
          />
          {lang === "python" ? (
            <CodeBlock lang="Python (Splitters)" code={PYTHON_SPLITTERS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Splitters)" code={JAVASCRIPT_SPLITTERS_CODE} />
          )}
          <InfoBox color="purple" icon={<ArrowRight size={20} />} title="Learn more about Splitters">
            See the Splitters section for details on how to configure document types and output actions.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Database size={24} />} title="Buckets API">
          <p>
            Write rows of data directly into a bucket programmatically — useful for syncing data
            from external systems or pushing records without going through a flow.
          </p>
          <InfoBox color="blue" icon={<Info size={20} />} title="When to use the Buckets API">
            Use this when you want to insert or replace rows in a bucket from your own application,
            a database, or an automation tool — independent of any flow run.
          </InfoBox>
          <BulletList
            items={[
              <Fragment key="f11">URL: <InlineCode>https://run.tavnit.io/api/buckets/write</InlineCode></Fragment>,
              <Fragment key="f12">Header: <InlineCode>X-API-Key: YOUR_API_KEY</InlineCode></Fragment>,
              <Fragment key="f13">Body: <InlineCode>bucket_id</InlineCode>, <InlineCode>bucket_name</InlineCode>, <InlineCode>overwrite</InlineCode> (bool), <InlineCode>rows</InlineCode> (array)</Fragment>,
            ]}
          />
          {lang === "python" ? (
            <CodeBlock lang="Python (Buckets)" code={PYTHON_BUCKETS_CODE} />
          ) : (
            <CodeBlock lang="JavaScript (Buckets)" code={JAVASCRIPT_BUCKETS_CODE} />
          )}
          <InfoBox color="purple" icon={<ArrowRight size={20} />} title="Learn more about Buckets">
            See the Buckets tab for column setup, access control, charts, and CSV import/export.
          </InfoBox>
        </DocCard>
      </div>

      {/* ── No-Code tab ── */}
      <div role="tabpanel" aria-label="No-Code" className={apiTab === "no-code" ? undefined : "hidden"}>
        <DocCard icon={<Star size={24} />} title="Automation Tools Overview">
          <p>
            You don&apos;t need to write code to integrate Tavnit with your workflows. No-code automation
            platforms let you connect apps visually and build powerful automations.
          </p>
          <p>Popular no-code platforms that work with Tavnit:</p>
          <InfoBox color="purple" icon={<CircleDot size={20} />} title="Make.com">
            Visual automation platform with 1000+ app integrations. Great for complex multi-step workflows.
          </InfoBox>
          <InfoBox color="yellow" icon={<Zap size={20} />} title="Zapier">
            Connect Tavnit to 5000+ apps with simple &ldquo;Zaps&rdquo;. Perfect for straightforward
            automations.
          </InfoBox>
          <InfoBox color="green" icon={<CircleDot size={20} />} title="n8n">
            Open-source workflow automation. Self-host or use their cloud service for full control.
          </InfoBox>
          <p>
            All of these platforms support HTTP requests, which means they can send documents to
            Tavnit&apos;s API.
          </p>
        </DocCard>

        <DocCard icon={<CircleDot size={24} />} title="Make.com Integration">
          <p>
            Make.com (formerly Integromat) is a visual automation platform that lets you connect apps and
            automate workflows without writing any code.
          </p>
          <a
            href="https://www.make.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#3b82f6] hover:text-[#93c5fd] transition-colors text-sm font-medium mt-1"
          >
            Visit Make.com <ExternalLink size={14} />
          </a>
        </DocCard>

        <DocCard icon={<Layers size={24} />} title="Getting Started with Make.com">
          <NumberedList
            items={[
              "Go to make.com and create a free account",
              'Click "Create a new scenario" from your dashboard',
              "You'll see a blank canvas where you can add modules",
              'Search for "HTTP" and add the "Make a request" module',
            ]}
          />
          <InfoBox color="blue" icon={<Info size={20} />} title="What is a Scenario?">
            A scenario is an automated workflow in Make.com. It consists of modules (apps) connected
            together. When one module triggers or receives data, it passes that data to the next module.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Configure the HTTP Module">
          <p>
            Once you&apos;ve added the HTTP module, configure it to send documents to Tavnit. You can use
            either of these two approaches:
          </p>

          <h3 className="text-base font-semibold text-[#3b82f6] mt-6 mb-3">
            Option 1: Multipart/form-data (when you have a File object)
          </h3>
          <NumberedList
            items={[
              'Add an HTTP "Make a request" module to your scenario',
              <Fragment key="f14">
                Configure the request:
                <BulletList
                  items={[
                    <>URL: <InlineCode>https://run.tavnit.io/api/runs/process</InlineCode></>,
                    "Method: POST",
                  ]}
                />
              </Fragment>,
              <Fragment key="f15">
                In the Headers tab, add:
                <BulletList
                  items={[
                    "Header name: X-API-Key",
                    "Header value: YOUR_API_KEY",
                  ]}
                />
              </Fragment>,
              'Set Body type to "multipart/form-data"',
              <Fragment key="f16">
                Add form fields:
                <BulletList
                  items={[
                    "flow_id: YOUR_FLOW_ID",
                    "source: api",
                    "file: (map from previous module)",
                  ]}
                />
              </Fragment>,
              "Run your scenario to test",
            ]}
          />

          <h3 className="text-base font-semibold text-[#6c42f0] mt-8 mb-3">
            Option 2: JSON + base64 (when you have a base64 string)
          </h3>
          <p>If your previous module outputs a base64 string instead of a file, use this approach:</p>
          <NumberedList
            items={[
              'Set Body type to "Raw" and select "JSON (application/json)"',
              <Fragment key="f17">
                In the Headers tab, also add:
                <BulletList
                  items={[
                    "Header name: Content-Type",
                    "Header value: application/json",
                  ]}
                />
              </Fragment>,
              "Set the JSON body to:",
            ]}
          />
          <CodeBlock lang="JSON" code={JSON_BODY_EXAMPLE} />

          <InfoBox color="blue" icon={<Info size={20} />} title="Mapping the base64 content">
            Replace {"{{previous_module.base64_content}}"} with the actual mapping from your previous
            module. In Make.com, click in the field and select the base64 output from the module that
            provides your file.
          </InfoBox>
        </DocCard>

        <DocCard icon={<Settings2 size={24} />} title="Other Platforms (Zapier, Power Automate, n8n)">
          <p>The same approach works for any automation platform that supports HTTP requests:</p>
          <InfoBox color="purple" icon={<Paperclip size={20} />} title="If your platform gives you a file object">
            Use multipart/form-data with a &ldquo;file&rdquo; field containing the file, plus flow_id and source fields.
          </InfoBox>
          <InfoBox color="violet" icon={<Code2 size={20} />} title="If your platform gives you a base64 string">
            Use a JSON body with flow_id, source, filename, and file_base64 (the base64 content from the previous step).
          </InfoBox>
          <p>Both methods call the same endpoint and produce identical extraction results.</p>
        </DocCard>

        <DocCard icon={<FolderInput size={24} />} title="Using Collections API">
          <p>
            If you receive different types of documents (invoices, receipts, contracts, etc.) and want AI to automatically
            route each document to the right flow, use the Collections API instead.
          </p>
          <InfoBox color="blue" icon={<ArrowLeftRight size={20} />} title="Collections vs Flows">
            Flows API: You specify which flow to use with flow_id. Collections API: AI analyzes the document and picks the best flow automatically using collection_id.
          </InfoBox>
          <p>The setup is identical to the Flows API above, with two small changes:</p>
          <BulletList
            items={[
              <Fragment key="f18">URL: <InlineCode>https://run.tavnit.io/api/collections/process</InlineCode></Fragment>,
              <Fragment key="f19">Use <InlineCode>collection_id</InlineCode> instead of <InlineCode>flow_id</InlineCode> in your request body</Fragment>,
            ]}
          />
          <p>Example JSON body for Collections:</p>
          <CodeBlock lang="JSON" code={COLLECTIONS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Wand2 size={24} />} title="Using Cleaners API">
          <p>
            If you want to enrich or normalise extracted data after a flow run, use the Cleaners API
            to trigger a sweep programmatically from your automation tool.
          </p>
          <InfoBox color="blue" icon={<ArrowLeftRight size={20} />} title="Cleaners vs Flows">
            Flows API: Extracts raw data from a document. Cleaners API: Post-processes that data — normalising, classifying, or enriching field values.
          </InfoBox>
          <p>Configuration in your HTTP module:</p>
          <BulletList
            items={[
              <Fragment key="f20">URL: <InlineCode>https://run.tavnit.io/api/sweeps/run</InlineCode></Fragment>,
              <Fragment key="f21">Use <InlineCode>cleaner_id</InlineCode> instead of <InlineCode>flow_id</InlineCode> in your request body</Fragment>,
            ]}
          />
          <p>Example JSON body for Cleaners:</p>
          <CodeBlock lang="JSON" code={CLEANERS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Split size={24} />} title="Using Splitters API">
          <p>
            If you receive combined PDFs containing multiple document types and need them separated into individual files, use the Splitters API.
          </p>
          <InfoBox color="blue" icon={<ArrowLeftRight size={20} />} title="Splitters vs Flows">
            Flows API: Extracts data from a single document using flow_id. Splitters API: Splits a multi-document PDF into individual documents using splitter_id.
          </InfoBox>
          <p>The setup is similar to the Flows API, with these changes:</p>
          <BulletList
            items={[
              <Fragment key="f22">URL: <InlineCode>https://run.tavnit.io/api/splits/run</InlineCode></Fragment>,
              <Fragment key="f23">Use <InlineCode>splitter_id</InlineCode> instead of <InlineCode>flow_id</InlineCode> in your request body</Fragment>,
            ]}
          />
          <p>Example JSON body for Splitters:</p>
          <CodeBlock lang="JSON" code={SPLITTERS_JSON_EXAMPLE} />
        </DocCard>

        <DocCard icon={<Database size={24} />} title="Using Buckets API">
          <p>
            If you want to push rows of data into a bucket from your automation tool — without sending a document for extraction — use the Buckets Write API.
          </p>
          <InfoBox color="blue" icon={<ArrowLeftRight size={20} />} title="Buckets vs Flows">
            Flows API: Sends a document for AI extraction. Buckets API: Writes structured rows directly into a bucket table.
          </InfoBox>
          <p>Configuration in your HTTP module:</p>
          <BulletList
            items={[
              <Fragment key="f24">URL: <InlineCode>https://run.tavnit.io/api/buckets/write</InlineCode></Fragment>,
              "Method: POST, Content-Type: application/json",
              <Fragment key="f25">Header: <InlineCode>X-API-Key: YOUR_API_KEY</InlineCode></Fragment>,
            ]}
          />
          <p>Example JSON body:</p>
          <CodeBlock lang="JSON" code={BUCKETS_JSON_EXAMPLE} />
          <InfoBox color="purple" icon={<Info size={20} />} title="Finding your Bucket ID & Name">
            Open the bucket&apos;s detail page and tap the info icon. Both values are copyable with a single tap.
          </InfoBox>
        </DocCard>
      </div>
    </section>
  );
}
