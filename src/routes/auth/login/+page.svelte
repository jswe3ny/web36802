<!-- routes/login/+page.svelte -->
<script lang="ts">
	import { enhance } from "$app/forms";
	import type {ActionData}  from './$types';
	export let form: ActionData;
</script>


	<div class= "py-[100px]">
		{#if form?.message}
		<div class="toast">
			<div class="alert alert-info bg-error font-semibold ">
			  <span >Error: {form.message}</span>
			</div>
		  </div>
		{/if}
		<h1 class="text-center text-3xl p-4">Login</h1>

		<form method="post" use:enhance class=" mx-auto py-4 px-10 flex flex-col max-w-sm gap-y-3">
			<div class="flex flex-col gap-1">
				<label for="username">Username</label>
				<input name="username" id="username" class="px-4 py-2 max" />
			</div>
			<div class="flex flex-col gap-1">	
				<label for="password">Password</label>
				<input type="password" name="password" id="password" class="px-4 py-2 max"/>
			</div>
			
			<button class="btn btn-success hover:text-gray-light">Continue</button>
		</form>


	</div>
	
