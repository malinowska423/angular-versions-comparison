export class TestsHelper {
  static readonly RECORDS = 5000;
  private static readonly REPEATS = 25;

  static runTest(
    name: string,
    initFn: () => void,
    testFn: () => void,
  ) {
    const results: number[] = [];
    const finishFn = () => {
      this._saveResults(name, results);
      alert(`Done ${name}`);
    };

    initFn();
    setTimeout(() => this._runTest(initFn, testFn, this.REPEATS, results, finishFn), 0);
  };

  static downloadResultsCSV(name = "results") {
    const results: ((string | number)[])[] = JSON.parse(localStorage.getItem("results") || "{}");

    const tests: string[] = results.reduce<string[]>(
      (acc: string[], result: (string | number)[]) => acc.concat(result.join(';')),
      []
    );

    this._download(tests.join("\n"), `${name}.csv`, "text/csv");
  };

  static clearResults() {
    localStorage.removeItem("results");
  }

  private static _download(
    content: string,
    fileName: string,
    contentType: string
  ) {
    const a = document.createElement("a");
    const file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  private static _logTime(time: number, results: number[]) {
    results.push(Math.round(performance.now() - time));
  }

  private static _saveResults(name: string, results: number[]) {
    const content = [name, ...results];
    const currentResults = JSON.parse(localStorage.getItem("results") || "[]");
    localStorage.setItem("results", JSON.stringify([...currentResults, content]));
  };

  private static _runTest(
    initFn: () => void,
    testFn: () => void,
    counter: number,
    results: number[],
    finishCallback: () => void
  ) {
    if (counter === 0) {
      finishCallback();
    } else {
      const time = performance.now();
      testFn();

      requestAnimationFrame(() =>
        setTimeout(() => {
          this._logTime(time, results);
          initFn();
          requestAnimationFrame(() =>
            setTimeout(() =>
                this._runTest(initFn, testFn, counter - 1, results, finishCallback),
              100
            )
          );
        }));
    }
  };
}