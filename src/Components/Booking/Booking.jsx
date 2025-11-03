import React, { useEffect } from 'react';

const Booking = () => {
  useEffect(() => {
    // Cal.com embed script
    (function (C, A, L) {
      let p = function (a, ar) {
        a.q.push(ar);
      };
      let d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    window.Cal("init", "30min", { origin: "https://app.cal.com" });

    window.Cal.ns["30min"]("inline", {
      elementOrSelector: "#my-cal-inline-30min",
      config: { layout: "month_view" },
      calLink: "ranitdas/30min",
    });

    window.Cal.ns["30min"]("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, []);

  return (
    <>
      {/* Booking */}
      <div className="bg-[#FF4C1B]" data-section="booking">
        <div className="max-w-6xl mx-auto py-24 space-y-10">
          <h3 className="radio-canada-big heading px-24 text-center text-black">
            We are the creative unit to partner with Brands that require
            distinctive creative experiences.
          </h3>

          {/* Embedded calendar section */}
          <div className="h-[500px] w-full mx-auto overflow-hidden" id="my-cal-inline-30min"></div>

          {/* Email link */}
          {/* <div className="flex justify-center text-center">
            <a
              className="radio-canada-big big-text text-black underline"
              href="mailto:hi@studioyuki.com"
            >
              hi@studioyuki.com
            </a>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Booking;
