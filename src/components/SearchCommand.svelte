<script lang="ts">
	import { Command, Dialog } from "bits-ui";
	import { MagnifyingGlass, File, FileText } from "svelte-radix";

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

		if (typeof window !== "undefined" && window.pagefind) {
			const results = await window.pagefind.search(value);
			const data = await Promise.all(
				results.results.slice(0, 8).map((r: any) => r.data()),
			);
			searchResults = data;
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
		class="p-2 rounded-lg sm:border sm:border-zinc-200 hover:bg-zinc-100 sm:dark:bg-zinc-700 sm:dark:border-zinc-500 dark:hover:bg-zinc-600 transition-all inline-flex items-center sm:min-w-64 justify-between"
	>
		<div class="flex flex-row gap-2">
			<MagnifyingGlass class="size-6 sm:size-5 dark:invert" />
			<span
				class="hidden sm:inline text-sm text-zinc-600 dark:text-zinc-300"
				>Search the guide...</span
			>
		</div>

		<kbd
			class="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 dark:text-white rounded"
		>
			<span>⌘</span>K
		</kbd>
	</Dialog.Trigger>

	<Dialog.Portal>
		<Dialog.Overlay
			class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
		/>
		<Dialog.Content
			class="fixed left-[50%] top-[50%] z-50 w-full max-w-[94%] translate-x-[-50%] translate-y-[-50%] sm:max-w-[640px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
		>
			<Dialog.Title class="sr-only">Search</Dialog.Title>
			<Dialog.Description class="sr-only">
				Search through the guide content. Use arrow keys to navigate.
			</Dialog.Description>

			<Command.Root
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
						oninput={(e) => handleSearch(e.currentTarget.value)}
					/>
					<kbd
						class="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 rounded"
					>
						ESC
					</kbd>
				</div>

				<Command.List
					class="max-h-[400px] overflow-y-auto overflow-x-hidden p-2"
				>
					<Command.Viewport>
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
											class="flex items-start gap-3 rounded-lg px-3 py-3 cursor-pointer select-none hover:bg-zinc-100 dark:hover:bg-zinc-700 data-highlighted:bg-zinc-100 dark:data-highlighted:bg-zinc-700 transition-colors"
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
					</Command.Viewport>
				</Command.List>

				<div
					class="border-t border-zinc-200 dark:border-zinc-700 px-4 py-2 text-xs text-zinc-500 dark:text-zinc-400"
				>
					<div class="flex items-center justify-between">
						<span
							>Press <kbd
								class="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 rounded"
								>↑↓</kbd
							> to navigate</span
						>
						<span
							>Press <kbd
								class="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 rounded"
								>↵</kbd
							> to select</span
						>
					</div>
				</div>
			</Command.Root>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
