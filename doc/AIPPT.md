## AIPPTIt's the basics.
1. DefinitionsPPTStructure（One.PPTWhat kind of pages are there?，What does every page have in it?）；
2. Based on the above structure，Define Data Formats，The data will be usedAIGenerate structuredPPTData，See specific structure：
    - Example data：`public/mocks/AIPPT.json`
    - Structure definitions：`src/types/AIPPT.ts`
3. Make Templates，Marked structure type in template；
4. AIGenerating matches.1Step-definedPPTStructured data；
5. UtilizationAIor other programmes，Generate associated maps（There's a common route.：AIVincent.、Database Search Match）；
6. WillAIData generated、Match the drawings with the template，Generate the finalPPT。

> Notes：Although the current-line version does not provide a map presentation，But...AIPPTIt's a way to support this function.，All you have to do is provide your own source.，Bring selected images together in the required formatAIPPTIt's just a way.。

## AIPPTTemplate Production Process
1. OpenPPTist；
2. Create Template Pages；
3. Open Top Left Menu[Slide Type Tags]Functions；
4. Description of page type and node type for a good page；
5. Export With ExportJSONDocumentation。

> Attention.：There's actually no specific offer.AIPPTTemplates for %1。It's calledAIPPTThe template's just holding on toPPTistIt's just a type tag for the regular page label.。These data are not just for use.AIGeneratePPT，You can also use it as a normal page template。

## Template Tag Type：Page Mark and Node Mark
#### Cover Page
* Title
* Text
* Pictures（Background、Page Illusion）
#### Contents Page
* Contents title（Mark Type：List Item）
* Pictures（Background、Page Illusion）
#### Transition Page（Chapter transition）
* Title
* Text
* Section Number
* Pictures（Background、Page Illusion）
#### Contents Page
* Title
* 2～4Contents Item，Including：
  * Content Item Title（Mark Type：List Item Title）
  * Content Item Body（Mark Type：List Item）
  * Content Item Number（Mark Type：Item number）
* Pictures（Background、Page Illusion、Project Illustration）
#### End Page（Acknowledgement page）
* Pictures（Background、Page Illusion）

> Node markers are divided into two. - Text Mark and Picture Mark：
> - Text marks can act on text nodes and shape nodes with text；
> - Picture tags only function for picture nodes；
> - You can add more types of tags yourself.（Like charts）。

## AIPPTTemplate production principles
One forAIPPTTemplates include at least the following pages（Total12Page）：
* 1A cover page
* 6Directory Pages（2～6Catalogue items1One.，10From a directory item1One.）
* 1Transition Page
* 3Contents Page（2～4Individual elements1One.）
* 1End page

> Attention.：
> 1. The number of pages above meets only the most basic requirements of the current replacement logic，♪ If I wish ♪AIGeneratedPPTThere's a certain randomity.，The number of each page needs to be increased appropriately（Let me give you an example.，Assuming that there is one in the template3A cover page，Generate from3Random Selection1Use individual）；
> 2. Under the current replacement logic，Table of contents supports1～20Directory Item，Content Page Supported1～12Contents Item，But we don't need to do every number of templates.，Because the program will automatically go through the template puzzle./Reduction in the number of special projects achieved；
> 3. You can adjust the replacement logic yourself.，To support more information。