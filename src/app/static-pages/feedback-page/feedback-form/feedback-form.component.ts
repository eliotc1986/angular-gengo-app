import { Component, OnInit } from "@angular/core";
import { FeedbackService } from "../shared/feedback.service";
import { Feedback } from "../shared/feedback";

@Component({
  selector: "feedback-form",
  templateUrl: "./feedback-form.component.html",
  styleUrls: ["./feedback-form.component.scss"]
})
export class FeedbackFormComponent implements OnInit {
  feedback: Feedback = new Feedback();
  categories: any = [
    "",
    "Bug",
    "Feature Request",
    "General Feedback",
    "Question",
    "Sending Love",
    "Delete Account",
    "Other"
  ];

  constructor(private feedbackSvc: FeedbackService) {}

  ngOnInit() {}

  createFeedback() {
    if (!this.feedback.category) this.feedback.category = "General Feedback";
    this.feedbackSvc.createFeedback(this.feedback);
    this.feedback = new Feedback(); // reset form
  }

  cancelFeedback() {
    this.feedback = new Feedback(); // reset form
  }
}
