export function Divider({ text }: { text: string }) {
	return (
		<div className="my-6 flex items-center">
			<div className="grow border-t" />

			<span className="text-muted-foreground mx-3 text-xs uppercase">
				{text}
			</span>

			<div className="grow border-t" />
		</div>
	);
}
