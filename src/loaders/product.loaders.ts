export default async function () {
  const imports = (await import(
    "@medusajs/medusa/dist/api/routes/store/products/index"
  )) as any
  imports.allowedStoreProductsFields = [
    ...imports.allowedStoreProductsFields,
    "batch_no",
  ]
  imports.defaultStoreProductsFields = [
    ...imports.defaultStoreProductsFields,
    "batch_no",
  ]
}