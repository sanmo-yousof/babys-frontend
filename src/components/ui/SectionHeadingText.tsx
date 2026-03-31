export default function SectionHeadingText({ text }: { text: string }) {
    return (
        <div className="flex items-end gap-3 md:gap-5">
            <h2 className="capitalize shrink-0 text-green font-bold font-roboto-slab text-2xl sm:text-3xl lg:text-4xl leading-none">
                {text}
            </h2>
            <div className="w-full h-0.5 bg-mid-grey/20 mb-1.5" />
        </div>
    );
}
