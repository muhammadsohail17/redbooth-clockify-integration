$(document).on('click', '.addCustomItem', function (e) {
    e.preventDefault();
    console.log('CLicked')
    $('.customItemContainer').append(
        `<div class="customItem flex items-center">
        <div class="flex">
            <div class="mt-1 flex-1">
                <label class="block text-sm font-medium leading-6 text-gray-900">Custom Item</label>
                <input type="text" name="customItem" class="customItem block w-80 rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <div class="ml-3 mt-1 flex-1">
                <label class="block text-sm font-medium leading-6 text-gray-900">Custom Value</label>
                <input type="text" name="customValue" class="customValue block w-80 rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
        </div>
        <div class="flex items-end">
            <button type="button" class="removeCustomItem w-8 h-8 inline-flex w-full items-center justify-center rounded-md border-2 border-gray-300 bg-white p-[5px] text-gray-400 hover:border-2 hover:border-gray-500 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </div>`
    );
});

$(document).on('click', '.removeCustomItem', function (e) {
    $(this).parents('.customItem').remove();
});

// $(document).ready(function () {
//     $('#monthSelect').val((new Date().getMonth() + 1).toString());
// });