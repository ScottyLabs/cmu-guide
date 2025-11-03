<script lang="ts">
	import { Command, Dialog } from "bits-ui";
	import { MagnifyingGlass, File, FileText } from "svelte-radix";
	import Kbd from "@/components/Kbd.svelte";

	let dialogOpen = $state(false);
	let searchQuery = $state("");
	let searchResults = $state<any[]>([]);

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			dialogOpen = !dialogOpen;
		}
	}

	async function handleSearch(value: string) {
		searchQuery = value;

		if (!value || value.length < 2) {
			searchResults = [];
			return;
		}

		if (!window.pagefind) {
			console.error("Pagefind not loaded yet");
			return;
		}

		try {
			const results = await window.pagefind.search(value);
			const data = await Promise.all(
				results.results.slice(0, 8).map((r: any) => r.data()),
			);
			searchResults = data;
		} catch (error) {
			console.error("Search error:", error);
		}
	}

	function handleResultClick(url: string) {
		dialogOpen = false;
		window.location.href = url;
	}
</script>

<svelte:document on:keydown={handleKeydown} />

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Trigger
		class="mr-2 md:mr-0 p-2 md:p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-600 md:bg-zinc-100 md:hover:bg-zinc-200 md:dark:bg-zinc-800 md:dark:hover:bg-zinc-700 transition-all inline-flex items-center md:min-w-80 justify-between"
	>
		<div class="flex flex-row gap-2 items-center">
			<MagnifyingGlass
				class="size-6 text-black dark:text-white md:text-zinc-400 md:dark:text-zinc-400"
			/>
			<span class="hidden md:inline text-sm text-zinc-400">
				Search the guide...
			</span>
		</div>

		<div class="hidden md:flex items-center gap-0.5">
			<Kbd>⌘</Kbd>
			<Kbd>K</Kbd>
		</div>
	</Dialog.Trigger>

	<Dialog.Portal>
		<Dialog.Overlay
			class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
		/>
		<Dialog.Content
			class="fixed left-[50%] top-[50%] z-50 w-full max-w-[94%] translate-x-[-50%] translate-y-[-50%] md:max-w-[640px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
		>
			<Dialog.Title class="sr-only">Search</Dialog.Title>
			<Dialog.Description class="sr-only">
				Search through the guide content. Use arrow keys to navigate.
			</Dialog.Description>

			<Command.Root
				loop={true}
				shouldFilter={false}
				class="flex h-full w-full flex-col overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-2xl"
			>
				<div
					class="flex items-center border-b border-zinc-200 dark:border-zinc-700 px-4"
				>
					<MagnifyingGlass
						class="w-5 h-5 text-zinc-400 dark:text-zinc-500"
					/>
					<Command.Input
						class="flex h-12 w-full bg-transparent py-3 px-3 text-sm outline-none placeholder:text-zinc-500 dark:placeholder:text-zinc-400 disabled:cursor-not-allowed disabled:opacity-50 dark:text-white"
						placeholder="Search the guide..."
						value={searchQuery}
						oninput={(e) => handleSearch(e.currentTarget.value)}
					/>
					<Kbd>ESC</Kbd>
				</div>

				<Command.List
					class="max-h-[400px] overflow-y-auto overflow-x-hidden p-2"
				>
					{#if searchQuery.length === 0}
						<div
							class="py-12 text-center text-sm text-zinc-500 dark:text-zinc-400"
						>
							<MagnifyingGlass
								class="w-10 h-10 mx-auto mb-3 text-zinc-300 dark:text-zinc-600"
							/>
							<p>Start typing to search...</p>
						</div>
					{:else if searchResults.length === 0}
						<Command.Empty
							class="py-12 text-center text-sm text-zinc-500 dark:text-zinc-400"
						>
							<FileText
								class="w-10 h-10 mx-auto mb-3 text-zinc-300 dark:text-zinc-600"
							/>
							<p>No results found for "{searchQuery}"</p>
						</Command.Empty>
					{:else}
						<Command.Group>
							<Command.GroupHeading
								class="px-2 py-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400"
							>
								Results
							</Command.GroupHeading>
							<Command.GroupItems>
								{#each searchResults as result}
									<Command.Item
										value={result.url}
										class="flex items-start gap-3 rounded-lg px-3 py-3 cursor-pointer select-none hover:bg-zinc-100 dark:hover:bg-zinc-700 data-selected:bg-zinc-100 dark:data-selected:bg-zinc-700 transition-colors"
										onclick={() =>
											handleResultClick(result.url)}
									>
										<File
											class="w-4 h-4 mt-0.5 text-zinc-400 dark:text-zinc-500 shrink-0"
										/>
										<div class="flex-1 min-w-0">
											<div
												class="font-medium text-sm text-zinc-900 dark:text-zinc-100 truncate"
											>
												{result.meta.title ||
													"Untitled"}
											</div>
											<div
												class="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 mt-1"
											>
												{@html result.excerpt}
											</div>
										</div>
									</Command.Item>
								{/each}
							</Command.GroupItems>
						</Command.Group>
					{/if}
				</Command.List>

				<div
					class="border-t border-zinc-200 dark:border-zinc-700 px-4 py-2 text-xs text-zinc-500 dark:text-zinc-400"
				>
					<div class="flex items-center justify-between">
						<span>
							Press <Kbd>↑↓</Kbd> to navigate
						</span>
						<span>
							Press <Kbd>↵</Kbd> to select
						</span>
					</div>
				</div>
			</Command.Root>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
