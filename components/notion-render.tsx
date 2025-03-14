import {
  Blockquote,
  Callout,
  Paragraph,
  Span,
  Image,
  CodeBlock,
  Heading,
  OrderedList,
  UnorderedList,
  Toggle,
  Bookmark,
  Table,
  Link,
  Embed,
  Video,
} from "@/components/atoms"
import nl2br from "react-nl2br"

interface NotionRenderProps {
  contents: Array<any>
}

const NotionRender = ({ contents }: NotionRenderProps) => {
  if (!contents || !Array.isArray(contents)) {
    return (
      <div className="space-y-4 text-term-gray">
        <p>No content available for this post.</p>
      </div>
    )
  }

  return <>{NotionToReact(contents)}</>
}

export const NotionToReact = (contents: Array<any>) => {
  if (!contents || !Array.isArray(contents)) return null
  return contents.map((content, i) => NotionElementToReact(content, i, contents))
}

export const NotionToHeading = (contents: Array<any>) => {
  if (!contents || !Array.isArray(contents)) return []

  const headingTypes = ["heading_1", "heading_2"]

  const heading = contents.filter((content) => headingTypes.includes(content.type))
  if (heading.length > 0) {
    return heading.map((content) => {
      const type = content.type
      const text = RichTextToReact(content[type].rich_text, {
        getRawContent: true,
      })
      const id = content.id.replace(/-/g, "")
      return {
        type: type,
        id: id,
        text: text,
      }
    })
  }
  return []
}

export const NotionElementToReact = (content: any, _index: number, contents: Array<any>) => {
  if (!content) return null

  let component = <></>

  const typeExist = content && "type" in content
  if (!typeExist) return component

  const type = content.type
  const text = RichTextToReact(content[type]?.rich_text ?? [])

  // Paragraph
  if (type === "paragraph") {
    component = <Paragraph key={_index}>{text}</Paragraph>
  }

  // Divider
  if (type === "divider") {
    component = <hr className="w-48 h-1 mx-auto my-4 bg-term-cyan/30 border-0 rounded md:my-10" />
  }

  // Heading
  if (type.includes("heading")) {
    const id = content.id.replace(/-/g, "")
    component = (
      <Heading key={_index} type={type} id={id}>
        <a key={_index} href={`#${id}`} className="text-term-cyan hover:text-term-cyan/80">
          {text}
        </a>
      </Heading>
    )
  }

  // Blockquote
  if (type === "quote") {
    component = <Blockquote className="border-l-4 border-term-cyan/30 pl-4 italic text-term-gray">{text}</Blockquote>
  }

  // Callout
  if (type === "callout") {
    const emoji = content[type].icon?.emoji
    component = (
      <Callout key={_index} emoji={emoji} className="bg-term-darker border border-term-cyan/20 p-4 my-4 rounded-lg">
        {text}
      </Callout>
    )
  }

  // Image
  if (type === "image") {
    const url = content[type][content[type].type]?.url
    const caption = RichTextToReact(content[type].caption)
    component = (
      <div className="my-6 max-w-2xl mx-auto">
        <Image key={_index} src={url || "/placeholder.svg"} alt="" caption={caption} className="rounded-lg" />
      </div>
    )
  }

  // Code
  if (type === "code") {
    const language = content[type].language
    const text = RichTextToReact(content[type].rich_text, {
      getFirstNode: true,
      rawContent: true,
    })
    component = (
      <CodeBlock
        key={_index}
        language={language}
        className="bg-term-darker border border-term-cyan/20 p-4 my-4 text-term-white font-mono rounded-lg"
      >
        {text}
      </CodeBlock>
    )
  }

  // Bulleted List
  if (type === "bulleted_list_item") {
    component = (
      <UnorderedList key={_index} className="list-disc pl-6 my-4 text-term-white">
        <li key={1}>
          {text}
          {content.has_children && NotionToReact(content.children)}
        </li>
      </UnorderedList>
    )
  }

  // Numbered List
  if (type === "numbered_list_item") {
    let index = 1
    for (let i = 0; i < contents.length; i++) {
      if (contents[i].type === "numbered_list_item") {
        if (i > 0 && contents[i - 1].type === "numbered_list_item") index++
        else index = 1
      }
      if (contents[i].id === content.id) break
    }
    component = (
      <OrderedList key={_index} number={index} className="list-decimal pl-6 my-4 text-term-white">
        <li key={1}>
          {text}
          {content.has_children && NotionToReact(content.children)}
        </li>
      </OrderedList>
    )
  }

  // Toggle
  if (type === "toggle") {
    component = (
      <Toggle key={_index} title={text} className="border border-term-cyan/20 bg-term-darker p-4 my-4 rounded-lg">
        {content.has_children && NotionToReact(content.children)}
      </Toggle>
    )
  }

  // Bookmark
  if (type === "bookmark") {
    const url = content[type].url
    component = (
      <Bookmark key={_index} url={url} className="border border-term-cyan/20 bg-term-darker p-4 my-4 rounded-lg" />
    )
  }

  // Embed
  if (type === "embed") {
    const url = content[type].url
    component = (
      <div className="mb-4 h-auto w-full flex justify-center">
        <Embed url={url} className="border border-term-cyan/20 bg-term-darker p-2 rounded-lg" />
      </div>
    )
  }

  // Pdf
  if (type === "pdf") {
    const url = content[type].external?.url
    component = (
      <div className="mb-4 w-full flex justify-center aspect-[8/11]">
        <Embed url={url} className="border border-term-cyan/20 rounded-lg" />
      </div>
    )
  }

  // Video
  if (type === "video" && content[type].type === "external") {
    const url = content[type].external?.url
    component = <Video url={url} className="my-4 border border-term-cyan/20 p-2 bg-term-darker rounded-lg" />
  }

  // Table
  if (type === "table") {
    const options = content[type]
    const data =
      content.children?.map((row: any) => {
        const type = row.type
        const cells = row[type].cells
        return cells
      }) || []

    component = (
      <Table
        data={data}
        options={options}
        className="w-full border-collapse my-4 text-term-gray border border-term-cyan/20 rounded-lg overflow-hidden"
      />
    )
  }

  return component
}

// Update the RichTextToReact function to use white text color for spans
export const RichTextToReact = (contents: Array<any>, options: any = {}) => {
  if (!contents || !Array.isArray(contents)) return <></>

  if (options.getRawContent && contents.length > 0) {
    const content = contents[0]
    return content.plain_text
  }

  if (options.getFirstNode && contents.length > 0) {
    const content = contents[0]
    const type = content.type
    const annotations = content?.plain_text ? content.annotations : {}
    return (
      <Span annotations={annotations} className="text-term-white">
        {content[type].content}
      </Span>
    )
  }

  return (
    <>
      {contents.map((content: any, index: number) => {
        const type = content.type
        const annotations = content?.plain_text ? content.annotations : {}
        if (content[type].link)
          return (
            <Link target="_blank" href={content[type].link.url} key={index} className="text-term-cyan hover:underline">
              {nl2br(content[type].content)}
            </Link>
          )
        return (
          <Span key={index} annotations={annotations} className="text-term-white">
            {nl2br(content[type].content)}
          </Span>
        )
      })}
    </>
  )
}

export default NotionRender

