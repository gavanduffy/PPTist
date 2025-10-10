## Basic Principles of AIPPT
1. Define the PPT structure (what types of pages exist in a deck and what content belongs on each page type).
2. Based on that structure, design the data format that AI will use to generate structured PPT data. For the detailed structure, see:
    - Sample data: `public/mocks/AIPPT.json`
    - Type definitions: `src/types/AIPPT.ts`
3. Build templates and tag the structure type within each template.
4. Have the AI generate data that matches the PPT structure defined in step 1.
5. Generate accompanying images with AI or other solutions (for example, text-to-image generation or stock image search).
6. Merge the AI-generated data and images with the templates to produce the final PPT.

> Note: The current online demo does not include an image preview, but the AIPPT workflow fully supports it. Provide your own image source and pass the candidate image set into the AIPPT method in the required format.

## AIPPT Template Creation Workflow
1. Open PPTist.
2. Design the template pages.
3. Enable the [Slide Type Annotation] feature in the top-left menu.
4. Tag each page with the appropriate page type and node types.
5. Export the template as a JSON file.

> Note: There is no special “AIPPT template.” An AIPPT template is simply a standard PPTist page with type annotations. The data can power AI-generated PPTs or serve as regular page templates.

## Template Tags: Page Tags and Node Tags
#### Cover Page
* Title
* Body text
* Images (backgrounds or illustrations)
#### Contents Page
* Contents title (tagged as: list item)
* Images (backgrounds or illustrations)
#### Transition Page (section break)
* Title
* Body text
* Section number
* Images (backgrounds or illustrations)
#### Content Page
* Title
* 2–4 content items, each including:
  * Item title (tagged as: list item title)
  * Item body text (tagged as: list item)
  * Item number (tagged as: item number)
* Images (backgrounds, page illustrations, or item illustrations)
#### Closing Page (thank-you page)
* Images (backgrounds or illustrations)

> There are two kinds of node tags—text tags and image tags:
> - Text tags apply to text nodes or shape nodes that contain text.
> - Image tags apply only to image nodes.
> - You can add additional tag types as needed (for example, charts).

## AIPPT Template Guidelines
An AIPPT template should contain at least the following pages (12 pages in total):
* 1 cover page
* 6 contents pages (one each with 2–6 items, plus one with 10 items)
* 1 transition page
* 3 content pages (one each with 2–4 content items)
* 1 closing page

> Notes:
> 1. The counts above satisfy only the minimum requirements of the current replacement logic. To introduce randomness into AI-generated PPTs, create multiple variations of each page type (for example, if there are 3 cover pages, one will be chosen at random).
> 2. Under the current replacement logic, contents pages support 1–20 items and content pages support 1–12 items. You don’t need to create a template for every possible count because the program automatically stitches or trims templates for special cases.
> 3. You can adjust the replacement logic yourself to support additional scenarios.