export default function Statement({ text }: { text: string }) {
  return (
    <legend className="text-sm font-semibold leading-6 text-gray-900">
      {text}
    </legend>
  )
}