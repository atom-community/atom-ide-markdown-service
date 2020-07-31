describe("Benchmark", () => {
  // This number doesn't match what timecope gives, but shows the trend
  it("Activation Benchmark", async function () {
    jasmine.attachToDOM(atom.views.getView(atom.workspace))
    /*    Activation     */
    // Trigger deferred activation
    atom.packages.triggerDeferredActivationHooks()
    // Activate activation hook
    atom.packages.triggerActivationHook("core:loaded-shell-environment")
    // Activate the package
    measure("Activation Time", async function activationBenchmark() {
      await atom.packages.activatePackage("atom-ide-markdown-service")
    })

    expect(atom.packages.isPackageLoaded("atom-ide-markdown-service")).toBeTruthy()
  })
})
