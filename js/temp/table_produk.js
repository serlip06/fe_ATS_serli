export let iniTabel =
`
    <tr class="border-b border-gray-200 ">
                            <td class="px-6 py-4 whitespace-no-wrap bg-white">
                              <div class="flex items-center">
                                <div class="flex-shrink-0 w-10 h-10">
                                   <img class="w-10 h-10" src="#GAMBAR#" alt="">
                                   </div>
                              </div>
                            </td>
                               <th class="whitespace-nowrap px-4 font-semibold text-xs text-coolGray-500 uppercase text-left">#ID#</th>
                            <td class="px-6 py-4 whitespace-no-wrap bg-white text-sm font-medium text-coolGray-500">#NAMA_PRODUK#</td>
                              <td class="whitespace-nowrap px-4 bg-white text-sm font-medium text-coolGray-500 text-left">#DESKRIPSI#</td>
                            <td class="px-6 py-4 whitespace-nowrap  bg-white text-sm font-medium text-coolGray-500">#HARGA#</td>
                            <td class="px-6 py-4 whitespace-nowrap  bg-white text-sm font-medium text-coolGray-500">#STOK#</td>
                              <td class="whitespace-nowrap pr-4 bg-white text-sm font-medium text-coolGray-800">
                            <a class="inline-block px-3 py-1 bg-yellow-500 text-white rounded-lg cursor-pointer shadow-md active:scale-95 transition-transform" type="button" href="editproduk.html?produkID=#IDEDIT#">Edit</a>
                             <span class="mx-1">|</span>
                            <button class="inline-block px-3 py-1 bg-red-500 text-white rounded-lg cursor-pointer shadow-md active:scale-95 transition-transform" type="button" id="del_button" onclick="confirmDelete('#IDHAPUS#')">Delete</button>
                            <span class="mx-1"></span>
                          
                           </td>
                        </td>
                        </tr> 
`