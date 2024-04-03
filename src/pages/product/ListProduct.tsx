import { FC } from "react";

import Swal from 'sweetalert2'

import { Table } from "@/components/table";
import { THeader } from "@/components/table/components/THeader";
import { TBody } from "@/components/table/components/TBody";
import { Tth } from "@/components/table/components/Tth";
import { Ttd } from "@/components/table/components/Ttd";

const ListProduct: FC = () => {

  const showDialogConfirmDelete = () => {
		Swal.fire({
			title: "Are you sure?",
			text: "You can restore this product later!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Confirm",
      reverseButtons: true
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: "Deleted!",
					text: "Your product has been deleted.",
					icon: "success",
				});
			}
		});
	};

  return (
		<div className="container flex min-h-screen flex-col px-6 py-3">
			<div className="breadcrumbs text-sm">
				<ul>
					<li>
						<a>Admin</a>
					</li>
					<li>List Product</li>
				</ul>
			</div>
			<div className="box-border px-5 py-5 shadow-md">
				<h2 className="text-2xl font-bold">List Product</h2>

				<div className="flex justify-between mt-5 px-4">
					<div className="flex">
						<label className="form-control w-full max-w-xs mr-2">
							<select className="select select-bordered">
								<option disabled selected>
									Filter type
								</option>
								<option>Star Wars</option>
								<option>Harry Potter</option>
								<option>Lord of the Rings</option>
								<option>Planet of the Apes</option>
								<option>Star Trek</option>
							</select>
						</label>
						<label className="form-control w-full max-w-xs">
							<select className="select select-bordered">
								<option disabled selected>
									Filter category
								</option>
								<option>Star Wars</option>
								<option>Harry Potter</option>
								<option>Lord of the Rings</option>
								<option>Planet of the Apes</option>
								<option>Star Trek</option>
							</select>
						</label>
					</div>

					<label className="input input-bordered flex items-center gap-2">
						<input type="text" className="grow" placeholder="Search" />
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							fill="currentColor"
							className="w-4 h-4 opacity-70"
						>
							<path
								fillRule="evenodd"
								d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
								clipRule="evenodd"
							/>
						</svg>
					</label>
				</div>

				<div className="mt-3">
					<Table totalRecord={100}>
						<THeader>
							<tr>
								<Tth>Name</Tth>
								<Tth>Type</Tth>
								<Tth>Category</Tth>
								<Tth>Price</Tth>
								<Tth>Status</Tth>
								<Tth>Action</Tth>
							</tr>
						</THeader>
						<TBody>
							<tr>
								<Ttd> Bún gạo chay </Ttd>
								<Ttd> Food </Ttd>
								<Ttd> Đồ ăn chay </Ttd>
								<Ttd>
									<div className="flex items-center">10.000</div>
								</Ttd>
								<Ttd>
									<div className="inline gap-x-2 rounded-full bg-emerald-100/60 px-3 py-1 text-sm font-normal text-emerald-500 dark:bg-gray-800">
										Active
									</div>
								</Ttd>
								<Ttd>
									<button
										onClick={showDialogConfirmDelete}
										className="btn btn-square outline-none h-12 w-12 hover:bg-red-100 hover:text-red-300 hover:border-red-200 border-red-400 bg-red-200 text-red-500"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="h-6 w-6"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
											/>
										</svg>
									</button>
								</Ttd>
							</tr>
						</TBody>
					</Table>
				</div>
			</div>
		</div>
	);
};

export default ListProduct;
